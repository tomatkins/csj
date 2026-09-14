import { ImageResponse } from 'next/og';
import { OG_IMAGE_ALT, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(145deg, #07101f 0%, #0c1c40 48%, #1a1033 100%)',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: 'linear-gradient(180deg, #10244f 0%, #54d2ff 42%, #ff7a1a 62%, #8b5cf6 100%)',
              boxShadow: '0 0 0 4px rgba(84,210,255,0.3)',
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', color: '#54d2ff' }}>
            AI consultancy for musicians
          </div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>{SITE_NAME}</div>
        <div style={{ marginTop: 24, fontSize: 32, color: 'rgba(255,255,255,0.72)', maxWidth: 860 }}>{SITE_TAGLINE}</div>
      </div>
    ),
    size,
  );
}
