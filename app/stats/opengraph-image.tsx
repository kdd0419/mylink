import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = '마이링크 통계 — 링크 클릭 현황';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#09090b';
const CARD = '#18181b';
const BORDER = 'rgba(255,255,255,0.07)';
const PRIMARY = '#10b981';
const TEXT = '#fafafa';
const MUTED = '#52525b';

const BARS = [
  { height: 130, opacity: 0.7 },
  { height: 80,  opacity: 0.55 },
  { height: 175, opacity: 1 },
  { height: 105, opacity: 0.65 },
  { height: 55,  opacity: 0.45 },
];

function loadFont(filename: string): ArrayBuffer {
  const buf = readFileSync(join(process.cwd(), 'public/fonts', filename));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

export default function Image() {
  const interBold = loadFont('inter-bold.woff');
  const interBlack = loadFont('inter-black.woff');
  const notoKrBold = loadFont('noto-sans-kr.woff');

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
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            left: -80,
            width: 380,
            height: 380,
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
                MY LINK · 통계
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
                링크 클릭
              </span>
              <span
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: PRIMARY,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                }}
              >
                통계 분석
              </span>
            </div>

            {/* Subtext */}
            <span
              style={{
                fontSize: 20,
                color: MUTED,
                lineHeight: 1.6,
              }}
            >
              내 링크가 얼마나 클릭됐는지 한눈에 확인하세요.
            </span>
          </div>

          {/* Right: Bar chart mockup */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 340,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 20,
                padding: '24px 28px',
                width: '100%',
              }}
            >
              {/* Chart label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div
                  style={{ width: 6, height: 6, borderRadius: '50%', background: PRIMARY }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#3f3f46',
                    letterSpacing: '0.12em',
                  }}
                >
                  CLICK ANALYTICS
                </span>
              </div>

              {/* Bars */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 10,
                  height: 175,
                  marginBottom: 10,
                }}
              >
                {BARS.map((bar, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: bar.height,
                      borderRadius: '6px 6px 3px 3px',
                      background: `linear-gradient(180deg, #34d399, #10b981)`,
                      opacity: bar.opacity,
                    }}
                  />
                ))}
              </div>

              {/* X-axis */}
              <div
                style={{
                  height: 1,
                  background: BORDER,
                  marginTop: 2,
                }}
              />

              {/* X labels */}
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: 10,
                }}
              >
                {['링크1', '링크2', '링크3', '링크4', '링크5'].map((label) => (
                  <div
                    key={label}
                    style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                  >
                    <span style={{ fontSize: 9, color: '#27272a', fontWeight: 600 }}>
                      {label}
                    </span>
                  </div>
                ))}
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
