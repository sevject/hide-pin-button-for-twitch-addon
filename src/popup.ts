const hideToggle = document.getElementById('hide-pin') as HTMLInputElement;

getShowPin().then((showPin) => {
  hideToggle.checked = !showPin;
  hideToggle.disabled = false;
});

hideToggle.addEventListener('change', () => {
  browser.storage.local.set({ [SHOW_PIN_KEY]: !hideToggle.checked });
});
