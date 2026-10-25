// Shared between the content script and the popup (both load this file first).
const SHOW_PIN_KEY = 'showPin';
// Set on <html> while pin buttons should be visible; content.css keys off it.
const SHOW_PIN_CLASS = 'twitch-hide-pin-disabled';

async function getShowPin(): Promise<boolean> {
  const stored = await browser.storage.local.get(SHOW_PIN_KEY);
  return stored[SHOW_PIN_KEY] === true;
}
