// Fetches the USD → NGN rate once per day (Next.js ISR cache), with a
// hardcoded fallback in case the rate API is ever down or rate-limited.
// Update FALLBACK_USD_TO_NGN occasionally so the fallback stays reasonable.

const FALLBACK_USD_TO_NGN = 1550

export async function getUsdToNgnRate(): Promise<number> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      // Revalidate once every 24 hours — this is what makes it "daily rates"
      // without hitting the API on every page view.
      next: { revalidate: 86400 },
    })

    if (!res.ok) return FALLBACK_USD_TO_NGN

    const data = await res.json()
    const rate = data?.rates?.NGN

    return typeof rate === 'number' && rate > 0 ? rate : FALLBACK_USD_TO_NGN
  } catch {
    return FALLBACK_USD_TO_NGN
  }
}

export function formatNgn(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`
}
