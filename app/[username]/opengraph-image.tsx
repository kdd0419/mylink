import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = '마이링크 프로필';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type FirestoreField = { stringValue?: string };
type FirestoreDoc = { fields: Record<string, FirestoreField> };
type QueryResult = Array<{ document?: FirestoreDoc }>;

async function getProfile(username: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'users' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'username' },
                op: 'EQUAL',
                value: { stringValue: username },
              },
            },
            limit: 1,
          },
        }),
      }
    );

    const data: QueryResult = await res.json();
    const doc = data[0]?.document;
    if (!doc) return null;

    const f = doc.fields;
    return {
      displayName: f.displayName?.stringValue || username,
      bio: f.bio?.stringValue || '',
      photoURL: f.photoURL?.stringValue || null,
      username: f.username?.stringValue || username,
    };
  } catch {
    return null;
  }
}

function loadFont(filename: string): ArrayBuffer {
  const buf = readFileSync(join(process.cwd(), 'public/fonts', filename));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const [profile, interBold, interBlack, notoKrBold] = await Promise.all([
    getProfile(username),
    Promise.resolve(loadFont('inter-bold.woff')),
    Promise.resolve(loadFont('inter-black.woff')),
    Promise.resolve(loadFont('noto-sans-kr.woff')),
  ]);

  const name = profile?.displayName || username;
  const bio = profile?.bio || '';
  const photoURL = profile?.photoURL ?? null;
  const handle = profile?.username || username;

  const shortBio = bio.length > 72 ? bio.slice(0, 69) + '...' : bio;
  const nameFontSize = name.length > 18 ? 42 : name.length > 12 ? 54 : 64;
  const initials = name.slice(0, 2).toUpperCase();

  const BG = '#09090b';
  const PRIMARY = '#10b981';
  const CARD = '#18181b';
  const BORDER = 'rgba(255,255,255,0.07)';
  const TEXT = '#fafafa';
  const MUTED = '#71717a';
  const DIM = '#52525b';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: BG,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Inter', 'Noto Sans KR'",
        }}
      >
        {/* Top-right glow */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Main layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            padding: '64px 80px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left: Profile info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              paddingRight: 64,
              height: '100%',
              justifyContent: 'center',
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: 100,
                padding: '6px 16px',
                marginBottom: 32,
                width: 'fit-content',
              }}
            >
              <div
                style={{ width: 6, height: 6, borderRadius: '50%', background: PRIMARY }}
              />
              <span
                style={{ color: PRIMARY, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}
              >
                MY LINK
              </span>
            </div>

            {/* Display name */}
            <span
              style={{
                fontSize: nameFontSize,
                fontWeight: 900,
                color: TEXT,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              {name}
            </span>

            {/* @username */}
            <span
              style={{
                fontSize: 22,
                color: PRIMARY,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                marginBottom: shortBio ? 24 : 36,
              }}
            >
              @{handle}
            </span>

            {/* Bio */}
            {shortBio ? (
              <span
                style={{
                  fontSize: 19,
                  color: MUTED,
                  lineHeight: 1.6,
                  marginBottom: 40,
                  maxWidth: 540,
                }}
              >
                {shortBio}
              </span>
            ) : null}

            {/* URL pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: '9px 16px',
                width: 'fit-content',
              }}
            >
              <div
                style={{ width: 6, height: 6, borderRadius: '50%', background: PRIMARY }}
              />
              <span
                style={{ fontSize: 15, color: DIM, fontWeight: 500, letterSpacing: '0.01em' }}
              >
                mylink.app/{handle}
              </span>
            </div>
          </div>

          {/* Right: Avatar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 260,
            }}
          >
            {/* Gradient ring */}
            <div
              style={{
                width: 204,
                height: 204,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #34d399, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Gap layer */}
              <div
                style={{
                  width: 196,
                  height: 196,
                  borderRadius: '50%',
                  background: BG,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 188,
                    height: 188,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: '#1c1c1e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoURL}
                      alt=""
                      width={188}
                      height={188}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 64,
                        fontWeight: 900,
                        color: PRIMARY,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {initials}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${PRIMARY} 30%, #34d399 70%, transparent)`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interBlack, weight: 900, style: 'normal' },
        { name: 'Noto Sans KR', data: notoKrBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
