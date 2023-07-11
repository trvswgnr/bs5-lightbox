
/*!
 * Lightbox for Bootstrap 5 v1.8.3 (https://trvswgnr.github.io/bs5-lightbox/)
 * Copyright 2023 Travis Aaron Wagner (https://github.com/trvswgnr/)
 * Licensed under MIT (https://github.com/trvswgnr/bs5-lightbox/blob/main/LICENSE)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define("Lightbox", ["bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["Lightbox"] = factory(require("bootstrap"));
	else
		root["Lightbox"] = factory(root["bootstrap"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_bootstrap__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "bootstrap":
/*!****************************!*\
  !*** external "bootstrap" ***!
  \****************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE_bootstrap__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "bootstrap");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */


const bootstrap = {
	Modal: bootstrap__WEBPACK_IMPORTED_MODULE_0__.Modal,
	Carousel: bootstrap__WEBPACK_IMPORTED_MODULE_0__.Carousel
};
class Lightbox {
	constructor(el, options = {}) {
		console.debug('Lightbox', el, options);
		this.hash = this.randomHash();
		this.settings = Object.assign(Object.assign(Object.assign({}, bootstrap.Modal.Default), bootstrap.Carousel.Default), {
			interval: false,
			target: '[data-toggle="lightbox"]',
			gallery: '',
			size: 'xl',
			constrain: true,
			prevLabel: 'Previous',
			nextLabel: 'Next'
		});
		this.settings = Object.assign(Object.assign({}, this.settings), options);
		this.modalOptions = (() => this.setOptionsFromSettings(bootstrap.Modal.Default))();
		this.carouselOptions = (() => this.setOptionsFromSettings(bootstrap.Carousel.Default))();
		if (typeof el === 'string') {
			this.settings.target = el;
			el = document.querySelector(this.settings.target);
		}
		this.el = el;
		this.type = el.dataset.type || '';

		this.src = this.getSrc(el);
		this.sources = this.getGalleryItems();
		this.createCarousel();
		this.createModal();
	}
	show() {
		document.body.appendChild(this.modalElement);
		this.modal.show();
	}
	hide() {
		this.modal.hide();
	}
	setOptionsFromSettings(obj) {
		return Object.keys(obj).reduce((p, c) => Object.assign(p, { [c]: this.settings[c] }), {});
	}
	getSrc(el) {
		let src = el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
		if (el.dataset.type === 'html') {
			return src;
		}
		if (!/\:\/\//.test(src)) {
			src = window.location.origin + src;
		}
		const url = new URL(src);
		if (el.dataset.footer || el.dataset.caption) {
			url.searchParams.set('caption', el.dataset.footer || el.dataset.caption);
		}
		return url.toString();
	}
	getGalleryItems() {
		let galleryTarget;
		if (this.settings.gallery) {
			if (Array.isArray(this.settings.gallery)) {
				return this.settings.gallery;
			}
			galleryTarget = this.settings.gallery;
		} else if (this.el.dataset.gallery) {
			galleryTarget = this.el.dataset.gallery;
		}
		const gallery = galleryTarget
			? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`), (v) => `${v.dataset.type ? v.dataset.type : ''}${this.getSrc(v)}`))]
			: [`${this.type ? this.type : ''}${this.src}`];
		return gallery;
	}
	getYoutubeId(src) {
		if (!src) return false;
		const matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
		return matches && matches[2].length === 11 ? matches[2] : false;
	}
	getYoutubeLink(src) {
		const youtubeId = this.getYoutubeId(src);
		if (!youtubeId) {
			return false;
		}

		const arr = src.split('?');
		let params = arr.length > 1 ? '?' + arr[1] : '';

		return `https://www.youtube.com/embed/${youtubeId}${params}`;
	}
	getInstagramEmbed(src) {
		if (/instagram/.test(src)) {
			src += /\/embed$/.test(src) ? '' : '/embed';
			return `<iframe src="${src}" class="start-50 translate-middle-x" style="max-width: 500px" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
		}
	}
	isEmbed(src) {
		const regex = new RegExp('(' + Lightbox.allowedEmbedTypes.join('|') + ')');
		const isEmbed = regex.test(src);
		const isImg = /\.(png|jpe?g|gif|svg|webp)/i.test(src) || this.el.dataset.type === 'image';

		return isEmbed || !isImg;
	}
	createCarousel() {
		const template = document.createElement('template');
		const types = Lightbox.allowedMediaTypes.join('|');
		const slidesHtml = this.sources
			.map((src, i) => {
				src = src.replace(/\/$/, '');
				const regex = new RegExp(`^(${types})`, 'i');
				const isHtml = /^html/.test(src);
				const isForcedImage = /^image/.test(src);

				if (regex.test(src)) {
					src = src.replace(regex, '');
				}
				const imgClasses = this.settings.constrain ? 'mw-100 mh-100 h-auto w-auto m-auto top-0 end-0 bottom-0 start-0' : 'h-100 w-100';
				const params = new URLSearchParams(src.split('?')[1]);
				let caption = '';
				let url = src;
				if (params.get('caption')) {
					try {
						url = new URL(src);
						url.searchParams.delete('caption');
						url = url.toString();
					} catch (e) {
						url = src;
					}
					caption = `<p class="lightbox-caption m-0 p-2 text-center text-white small"><em>${params.get('caption')}</em></p>`;
				}
				let inner = `<img src="${url}" class="d-block ${imgClasses} img-fluid" style="z-index: 1; object-fit: contain;" />`;
				let attributes = '';
				const instagramEmbed = this.getInstagramEmbed(src);
				const youtubeLink = this.getYoutubeLink(src);
				if (this.isEmbed(src) && !isForcedImage) {
					if (youtubeLink) {
						src = youtubeLink;
						attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"';
					}
					inner = instagramEmbed || `<iframe src="${src}" ${attributes} allowfullscreen></iframe>`;
				}
				if (isHtml) {
					inner = src;
				}
				const spinner = `<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem height: 3rem" role="status"></div></div>`;
				return `
				<div class="carousel-item ${!i ? 'active' : ''}" style="min-height: 100px">
					${spinner}
					<div class="ratio ratio-16x9" style="background-color: #000;">${inner}</div>
					${caption}
				</div>`;
			})
			.join('');
		const controlsHtml =
			this.sources.length < 2
				? ''
				: `
			<button id="#lightboxCarousel-${this.hash}-prev" class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">${this.settings.prevLabel}</span>
			</button>
			<button id="#lightboxCarousel-${this.hash}-next" class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="next">
				<span class="visually-hidden">${this.settings.nextLabel}</span>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
			</button>`;
		let classes = 'lightbox-carousel carousel slide';
		if (this.settings.size === 'fullscreen') {
			classes += ' position-absolute w-100 translate-middle top-50 start-50';
		}
		const html = `
			<div id="lightboxCarousel-${this.hash}" class="${classes}" data-bs-ride="carousel" data-bs-interval="${this.carouselOptions.interval}">
				<div class="carousel-inner">
					${slidesHtml}
				</div>
				${controlsHtml}
			</div>`;
		template.innerHTML = html.trim();
		this.carouselElement = template.content.firstChild;
		const carouselOptions = Object.assign(Object.assign({}, this.carouselOptions), { keyboard: false });
		this.carousel = new bootstrap.Carousel(this.carouselElement, carouselOptions);
		const elSrc = this.type && this.type !== 'image' ? this.type + this.src : this.src;
		this.carousel.to(this.findGalleryItemIndex(this.sources, elSrc));
		if (this.carouselOptions.keyboard === true) {
			document.addEventListener('keydown', (e) => {
				if (e.code === 'ArrowLeft') {
					const prev = document.getElementById(`#lightboxCarousel-${this.hash}-prev`);
					if (prev) {
						prev.click();
					}
					return false;
				}
				if (e.code === 'ArrowRight') {
					const next = document.getElementById(`#lightboxCarousel-${this.hash}-next`);
					if (next) {
						next.click();
					}
					return false;
				}
			});
		}
		return this.carousel;
	}
	findGalleryItemIndex(haystack, needle) {
		let index = 0;
		for (const item of haystack) {
			if (item.includes(needle)) {
				return index;
			}
			index++;
		}
		return 0;
	}
	createModal() {
		const template = document.createElement('template');
		const btnInner =
			'<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>';
		const html = `
			<div class="modal lightbox fade" id="lightboxModal-${this.hash}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-${this.settings.size}">
					<div class="modal-content border-0 bg-transparent">
						<div class="modal-body p-0">
							<button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2; background: none;">${btnInner}</button>
						</div>
					</div>
				</div>
			</div>`;
		template.innerHTML = html.trim();
		this.modalElement = template.content.firstChild;
		this.modalElement.querySelector('.modal-body').appendChild(this.carouselElement);
		this.modalElement.addEventListener('hidden.bs.modal', () => this.modalElement.remove());
		this.modalElement.querySelector('[data-bs-dismiss]').addEventListener('click', () => this.modal.hide());
		this.modal = new bootstrap.Modal(this.modalElement, this.modalOptions);
		return this.modal;
	}
	randomHash(length = 8) {
		return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
	}
}
Lightbox.allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'];
Lightbox.allowedMediaTypes = [...Lightbox.allowedEmbedTypes, 'image', 'html'];
Lightbox.defaultSelector = '[data-toggle="lightbox"]';
Lightbox.initialize = function (e) {
	e.preventDefault();
	const lightbox = new Lightbox(this);
	lightbox.show();
};
document.querySelectorAll(Lightbox.defaultSelector).forEach((el) => el.addEventListener('click', Lightbox.initialize));
if (typeof window !== 'undefined' && window.bootstrap) {
	window.bootstrap.Lightbox = Lightbox;
}
/* harmony default export */ __webpack_exports__["default"] = (Lightbox);

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map