import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = '마이링크 — 모든 링크를 하나의 페이지로';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#09090b';
const CARD = '#18181b';
const BORDER = 'rgba(255,255,255,0.07)';
const PRIMARY = '#10b981';
const TEXT = '#fafafa';
const MUTED = '#52525b';

function loadFont(filename: string): ArrayBuffer {
  const buf = readFileSync(join(process.cwd(), 'public/fonts', filename));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

export default function Image() {
  const interBold = loadFont('inter-bold.woff');
  const interBlack = loadFont('inter-black.woff');
  const notoKrBold = loadFont('noto-sans-kr.woff');

  const linkCards = [
    { label: 'GitHub', dot: '#a1a1aa' },
    { label: 'Personal Blog', dot: '#60a5fa' },
    { label: 'YouTube', dot: '#f87171' },
    { label: 'Portfolio', dot: '#a78bfa' },
  ];

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
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Main layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            padding: '64px 72px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left: Text */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              paddingRight: 80,
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
                padding: '7px 18px',
                marginBottom: 36,
                width: 'fit-content',
              }}
            >
              <div
                style={{ width: 7, height: 7, borderRadius: '50%', background: PRIMARY }}
              />
              <span
                style={{ color: PRIMARY, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}
              >
                MY LINK
              </span>
            </div>

            {/* Headline */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 28 }}>
              <span
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: TEXT,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                }}
              >
                모든 링크를
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span
                  style={{
                    fontSize: 68,
                    fontWeight: 900,
                    color: PRIMARY,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.08,
                  }}
                >
                  하나의 페이지
                </span>
                <span
                  style={{
                    fontSize: 68,
                    fontWeight: 900,
                    color: TEXT,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.08,
                  }}
                >
                  로.
                </span>
              </div>
            </div>

            {/* Subtext */}
            <span
              style={{
                fontSize: 20,
                color: MUTED,
                lineHeight: 1.6,
                marginBottom: 44,
              }}
            >
              GitHub, 블로그, 포트폴리오를 한 곳에 모으세요.
            </span>

            {/* CTA pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: PRIMARY,
                borderRadius: 100,
                padding: '13px 28px',
                width: 'fit-content',
              }}
            >
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>
                지금 시작하기 →
              </span>
            </div>
          </div>

          {/* Right: Link card mockups */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 11,
              width: 290,
            }}
          >
            {linkCards.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: '14px 16px',
                  opacity: 1 - i * 0.13,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: `${item.dot}20`,
                      border: `1px solid ${item.dot}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{ width: 10, height: 10, borderRadius: '50%', background: item.dot }}
                    />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#a1a1aa' }}>
                    {item.label}
                  </span>
                </div>
                <div
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#27272a' }}
                />
              </div>
            ))}
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
