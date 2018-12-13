# NAPC Poverty Indicators Map

This is a web-based interactive map that will be embedded into NAPC’s Talambayan microsite.

## Development

Install packages

```
npm install
```

Get `.env` from the 1Password vault and put it in the root directory.

Run site

```
npm start
```

## Deployment

This prototype is currently deployed [here](https://napc-6ec1b.firebaseapp.com/).

Install `firebase-tools`:
```
npm install -g firebase-tools
```

Run this in the root folder:
```
firebase deploy
```

## Built With

* [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) - JavaScript library that uses WebGL to render interactive maps
* [Firebase](https://firebase.google.com/docs/web/setup?authuser=0) - mobile and web application development platform
