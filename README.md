# Lightbox for Bootstrap 5

[![](https://data.jsdelivr.com/v1/package/npm/bs5-lightbox/badge)](https://www.jsdelivr.com/package/npm/bs5-lightbox)

A pure JavaScript Bootstrap 5 lightbox that supports images, galleries, YouTube, Vimeo, and Instagram—built around Bootstrap's Modal and Carousel plugins.

Have you been using [Lightbox for Bootstrap (ekko-lightbox)](https://github.com/ashleydw/lightbox) but recently moved to Bootstrap 5? This is your replacement.

Documentation: https://trvswgnr.github.io/bs5-lightbox/

## Installation
##### Install with NPM:
```shell
npm i bs5-lightbox
```

##### CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/bs5-lightbox@1.7.7/dist/index.bundle.min.js"></script>
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
