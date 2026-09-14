import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            background: 'linear-gradient(180deg, #10244f 0%, #54d2ff 42%, #ff7a1a 62%, #8b5cf6 100%)',
            boxShadow: '0 0 0 2px rgba(84,210,255,0.35)',
            display: 'flex',
          }}
        />
      </div>
    ),
    size,
  );
}
