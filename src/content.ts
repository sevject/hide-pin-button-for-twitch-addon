// Twitch only renders pin controls for moderators and the broadcaster, so
// hiding every pin control is equivalent to hiding it "when you're a mod".

// Compared case-insensitively against aria-label, title and visible text.
// A label matches if it equals an entry or starts with one followed by a comma,
// e.g. "Diese Nachricht anheften, <channel>".
// Add your Twitch UI language here if it isn't covered.
const PIN_LABELS = [
  'pin',
  'pin message',
  'pin this message',
  'pin chat message',
  'anheften',
  'nachricht anheften',
  'diese nachricht anheften',
  'anpinnen',
];

const HIDDEN_ATTR = 'data-twitch-hide-pin';
const CANDIDATES = 'button, [role="button"], [role="menuitem"], a';
// How far up to walk through wrappers that contain nothing but the pin control.
const MAX_WRAPPER_DEPTH = 3;

function normalize(text: string | null): string {
  return (text ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function isPinLabel(text: string | null): boolean {
  const label = normalize(text);
  return PIN_LABELS.some((pin) => label === pin || label.startsWith(`${pin},`));
}

function isPinControl(el: Element): boolean {
  return (
    isPinLabel(el.getAttribute('aria-label')) ||
    isPinLabel(el.getAttribute('title')) ||
    isPinLabel(el.textContent)
  );
}

function hide(el: Element): void {
  // Tooltip/layout wrappers would otherwise leave an empty gap behind.
  let target = el;
  for (let i = 0; i < MAX_WRAPPER_DEPTH; i++) {
    const parent = target.parentElement;
    if (!parent || parent === document.body || parent.childElementCount !== 1) break;
    target = parent;
  }
  target.setAttribute(HIDDEN_ATTR, '');
}

function scan(root: ParentNode): void {
  if (root instanceof Element && root.matches(CANDIDATES) && isPinControl(root)) {
    hide(root);
  }
  root.querySelectorAll(CANDIDATES).forEach((el) => {
    if (!el.closest(`[${HIDDEN_ATTR}]`) && isPinControl(el)) hide(el);
  });
}

function applyShowPin(showPin: boolean): void {
  document.documentElement.classList.toggle(SHOW_PIN_CLASS, showPin);
}

function start(): void {
  getShowPin().then(applyShowPin);
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && SHOW_PIN_KEY in changes) {
      applyShowPin(changes[SHOW_PIN_KEY].newValue === true);
    }
  });

  scan(document);

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes') {
        if (m.target instanceof Element) scan(m.target);
        continue;
      }
      m.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node);
        else if (node.parentElement) scan(node.parentElement);
      });
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: false,
    attributes: true,
    attributeFilter: ['aria-label', 'title'],
  });
}

start();
