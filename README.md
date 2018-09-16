
# NAPC Poverty Indicators Map


This is a web-based interactive map that will be embedded into NAPC’s Talambayan microsite.

## Getting Started

### Installing

Run the code below inside the `public` folder: 

```
python -m SimpleHTTPServer
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