import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [cryptoResponse, fiatResponse] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h&sparkline=true', {
        headers: { accept: 'application/json' },
        cache: 'no-store',
      }),
      fetch('https://api.frankfurter.app/latest?from=USD&to=GBP,CAD', {
        headers: { accept: 'application/json' },
        cache: 'no-store',
      }),
    ]);

    if (!cryptoResponse.ok || !fiatResponse.ok) {
      return NextResponse.json(
        { error: 'Market data provider returned an error.' },
        { status: 502 }
      );
    }

    const [crypto, fiat] = await Promise.all([
      cryptoResponse.json(),
      fiatResponse.json(),
    ]);

    return NextResponse.json(
      { crypto, fiat },
      {
        headers: {
          'Cache-Control': 's-maxage=30, stale-while-revalidate=120',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Unable to fetch market data.' },
      { status: 502 }
    );
  }
}
