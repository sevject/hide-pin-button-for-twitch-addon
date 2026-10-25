# Hide Pin Button for Twitch

A Firefox add-on that hides the **Pin message** button in Twitch chat, so moderators don't pin messages by accident.

Twitch only shows pin controls to moderators and the broadcaster, so for regular viewers the add-on has nothing to hide.

## Features

- Hides the pin button on chat messages and the "Pin message" entry in message menus
- **Unpin** stays visible
- A switch to show the pin button again when you need it; applies to all open Twitch tabs instantly
- Works on `www.twitch.tv`, `m.twitch.tv`, `dashboard.twitch.tv` and popout chat
- Firefox desktop (115+) and Firefox for Android (120+)
- Supports the English and German Twitch UI
- Collects no data

## Installation

### Firefox desktop

1. Download the latest `.xpi` file from [Releases](https://github.com/sevject/hide-pin-button-for-twitch-addon/releases).
2. If Firefox shows a notice that it blocked the installation, click **Continue to Installation**.
3. Click **Add**.

If you downloaded the file first, open `about:addons`, click the **⚙ gear icon → Install Add-on From File…** and select it.

### Firefox for Android

1. Open the [Releases](https://github.com/sevject/hide-pin-button-for-twitch-addon/releases) page in Firefox for Android and tap the latest `.xpi` file.
2. Confirm the installation.

Alternatively, download the file, then open **Settings → About Firefox** and tap the Firefox logo 5 times. Back in **Settings**, choose **Install extension from file** and select it.

## Usage

Click the add-on's icon in the toolbar (on Android: **⋮ → Extensions → Hide Pin Button for Twitch**) and use the **Hide pin button** switch:

- **On** (default): pin buttons are hidden
- **Off**: pin buttons are shown as usual

If the icon isn't in your toolbar, find it under the puzzle-piece menu and pin it there.

## The pin button still shows up?

Your Twitch language is probably not supported yet. Please [open an issue](https://github.com/sevject/hide-pin-button-for-twitch-addon/issues) with:

1. Your Twitch language
2. The button's label: right-click the pin button, choose **Inspect**, and copy the value of `aria-label`

## Privacy

The add-on collects no data and makes no network requests. Its only permission, `storage`, saves the state of the switch in your browser.

## Disclaimer

This project is not affiliated with or endorsed by Twitch Interactive, Inc.
