let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 1 * 60 * 1000; // 5 minutes cache

export async function handler() {
  const now = Date.now();

  if (!cachedData || now - lastFetchTime > CACHE_DURATION_MS) {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx6UxWy4AJiYVBelqr55NCZ3g3d8ky2TGotOA4KdRQmAsVwze10VEM3WXC3g3rpmUI5/exec"
      );
      if (!response.ok) throw new Error("Apps Script fetch failed");
      cachedData = await response.json();
      lastFetchTime = now;
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 200, body: JSON.stringify(cachedData) };
}
