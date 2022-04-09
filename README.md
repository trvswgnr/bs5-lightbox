# Lightbox for Bootstrap 5

A pure JavaScript Bootstrap 5 lightbox that supports images, galleries, YouTube, Vimeo, and Instagram—built around Bootstrap's Modal and Carousel plugins.

Have you been using [Lightbox for Bootstrap (ekko-lightbox)](https://github.com/ashleydw/lightbox) but recently moved to Bootstrap 5? This is your replacement.

Documentation: https://trvswgnr.github.io/bs5-lightbox/

<sub>If you enjoy using Bootstrap 5 Lightbox please star this repo.</sub>

## Status
[![github latest release](https://badgen.net/github/tag/trvswgnr/bs5-lightbox?label=release)](https://github.com/trvswgnr/bs5-lightbox/releases/latest)
[![jsdelivr hits per month](https://data.jsdelivr.com/v1/package/npm/bs5-lightbox/badge?style=rounded)](https://www.jsdelivr.com/package/npm/bs5-lightbox)
[![npm downloads](https://badgen.net/npm/dt/bs5-lightbox?label=npm%20downloads&color=blue)](https://www.npmjs.com/package/bs5-lightbox)
[![npm minzipped size](https://badgen.net/bundlephobia/minzip/bs5-lightbox?label=gzip%20size&color=green)](https://bundlephobia.com/package/bs5-lightbox)
[![npm version](https://badgen.net/npm/v/bs5-lightbox)](https://www.npmjs.com/package/bs5-lightbox)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/bs5-lightbox)
[![Featured on Openbase](https://badges.openbase.com/js/featured/bs5-lightbox.svg?token=R2MqRDwb93ap0dYGkIBBPigErEYve+e1dnfTDZImQog=)](https://openbase.com/js/bs5-lightbox)

## Installation
##### Install with NPM:
```shell
npm i bs5-lightbox
```

##### CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/bs5-lightbox@1.8.0/dist/index.bundle.min.js"></script>
```

Or [download the file directly](https://raw.githubusercontent.com/trvswgnr/bs5-lightbox/main/dist/index.bundle.min.js) (right-click, Save As...)


Lightbox for Bootstrap 5 will automatically initialize on import:
```js
import 'bs5-lightbox'
```
By default it will target elements with the `data-toggle-"lightbox"` attribute.

If you want to target a different element, import the `Lightbox` class and instantiate it:
```js
import Lightbox from 'bs5-lightbox'

document.querySelectorAll('.my-lightbox-toggle').forEach((el) => el.addEventListener('click', (e) => {
	e.preventDefault();
	const lightbox = new Lightbox(el);
	lightbox.show();
}));
```

## Contributing
Lightbox for Bootstrap 5 is written in TypeScript and compiled to pure JavaScript.
Modify the src/index.ts file, run `npm run build` and create a pull request.

You can help make this project even better and keep it up to date by making a small contribution! [Fund this project](https://github.com/sponsors/trvswgnr).

## Copyright and license

Code released under [the MIT license](https://github.com/trvswgnr/bs5-lightbox/blob/main/LICENSE).
