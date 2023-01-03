# Warp Remix Plugin

This plugin allows developers to transpile Solidity contracts to Cairo from the Remix IDE. It uses Nethermind's [Warp](https://github.com/NethermindEth/warp) to do so.

This is only a proof of concept and is not intended for production use at the moment.

Since Warp was built to be used as a library, it is not possible to use it in the browser. Therefore, this plugin uses a Node.js server to run Warp and communicate with Remix.

See server setup instructions [here](https://github.com/jelilat/warp-server). You need to run the server before to use this plugin.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Add the plugin to Remix

1. Go to the Plugins tab in Remix
2. Click on the "Connect to a Local Plugin" button.
3. Enter the name of the plugin: (e.g. `Warp`)
4. Enter the URL of the plugin: (e.g. `http://localhost:3000/`).

## Using the plugin

1. Open a Solidity file in Remix.
2. Click on the "Warp" button in the Plugins tab.
3. Click on "Activate" to activate the plugin.
4. Click on "Transpile" to transpile the contract to Cairo.
