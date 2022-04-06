
/*!
 * Lightbox for Bootstrap 5 v1.7.11 (https://trvswgnr.github.io/bs5-lightbox/)
 * Copyright 2022 Travis Aaron Wagner (https://github.com/trvswgnr/)
 * Licensed under MIT (https://github.com/trvswgnr/bs5-lightbox/blob/main/LICENSE)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define(["bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["Lightbox"] = factory(require("bootstrap"));
	else
		root["Lightbox"] = factory(root["bootstrap"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__988__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 988:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__988__;

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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(988);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */

var bootstrap = {
  Modal: bootstrap__WEBPACK_IMPORTED_MODULE_0__.Modal,
  Carousel: bootstrap__WEBPACK_IMPORTED_MODULE_0__.Carousel
};

var Lightbox = /*#__PURE__*/function () {
  function Lightbox(el) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Lightbox);

    this.hash = this.randomHash();
    this.settings = Object.assign(Object.assign(Object.assign({}, bootstrap.Modal.Default), bootstrap.Carousel.Default), {
      interval: false,
      target: '[data-toggle="lightbox"]',
      gallery: '',
      size: 'xl'
    });

    this.modalOptions = function () {
      return _this.setOptionsFromSettings(bootstrap.Modal.Default);
    }();

    this.carouselOptions = function () {
      return _this.setOptionsFromSettings(bootstrap.Carousel.Default);
    }();

    if (typeof el === 'string') {
      this.settings.target = el;
      el = document.querySelector(this.settings.target);
    }

    this.settings = Object.assign(Object.assign({}, this.settings), options);
    this.el = el;
    this.type = el.dataset.type || 'image';
    this.src = this.getSrc(el);
    this.sources = this.getGalleryItems();
    this.createCarousel();
    this.createModal();
  }

  _createClass(Lightbox, [{
    key: "show",
    value: function show() {
      document.body.appendChild(this.modalElement);
      this.modal.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.modal.hide();
    }
  }, {
    key: "setOptionsFromSettings",
    value: function setOptionsFromSettings(obj) {
      var _this2 = this;

      return Object.keys(obj).reduce(function (p, c) {
        return Object.assign(p, _defineProperty({}, c, _this2.settings[c]));
      }, {});
    }
  }, {
    key: "getSrc",
    value: function getSrc(el) {
      var src = el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
      console.log('el.dataset.type', el.dataset.type);

      if (el.dataset.type === 'html') {
        return src;
      }

      if (!/\:\/\//.test(src)) {
        src = window.location.origin + src;
      }

      var url = new URL(src);

      if (el.dataset.footer || el.dataset.caption) {
        url.searchParams.set('caption', el.dataset.footer || el.dataset.caption);
      }

      return url.toString();
    }
  }, {
    key: "getGalleryItems",
    value: function getGalleryItems() {
      var _this3 = this;

      var galleryTarget;

      if (this.settings.gallery) {
        if (Array.isArray(this.settings.gallery)) {
          return this.settings.gallery;
        }

        galleryTarget = this.settings.gallery;
      } else if (this.el.dataset.gallery) {
        galleryTarget = this.el.dataset.gallery;
      }

      var gallery = galleryTarget ? _toConsumableArray(new Set(Array.from(document.querySelectorAll("[data-gallery=\"".concat(galleryTarget, "\"]")), function (v) {
        return "".concat(v.dataset.type && v.dataset.type !== 'image' ? v.dataset.type : '').concat(_this3.getSrc(v));
      }))) : ["".concat(this.type && this.type !== 'image' ? this.type : '').concat(this.src)];
      return gallery;
    }
  }, {
    key: "getYoutubeId",
    value: function getYoutubeId(src) {
      if (!src) return false;
      var matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
      return matches && matches[2].length === 11 ? matches[2] : false;
    }
  }, {
    key: "getInstagramEmbed",
    value: function getInstagramEmbed(src) {
      if (/instagram/.test(src)) {
        src += /\/embed$/.test(src) ? '' : '/embed';
        return "<iframe src=\"".concat(src, "\" class=\"start-50 translate-middle-x\" style=\"max-width: 500px\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>");
      }
    }
  }, {
    key: "isEmbed",
    value: function isEmbed(src) {
      var regex = new RegExp('(' + Lightbox.allowedEmbedTypes.join('|') + ')');
      var isEmbed = regex.test(src);
      var isImg = /\.(png|jpe?g|gif|svg|webp)/i.test(src) || this.el.dataset.type === 'image';
      return isEmbed || !isImg;
    }
  }, {
    key: "createCarousel",
    value: function createCarousel() {
      var _this4 = this;

      var template = document.createElement('template');
      var types = Lightbox.allowedMediaTypes.join('|');
      var slidesHtml = this.sources.map(function (src, i) {
        src = src.replace(/\/$/, '');
        var regex = new RegExp("^(".concat(types, ")"), 'i');
        var isHtml = /^html/.test(src);

        if (regex.test(src)) {
          src = src.replace(regex, '');
        }

        var inner = "<img src=\"".concat(src, "\" class=\"d-block w-100 h-100 img-fluid\" style=\"z-index: 1; object-fit: contain;\" />");
        var attributes = '';

        var instagramEmbed = _this4.getInstagramEmbed(src);

        var youtubeId = _this4.getYoutubeId(src);

        if (_this4.isEmbed(src)) {
          if (youtubeId) {
            src = "https://www.youtube.com/embed/".concat(youtubeId);
            attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"';
          }

          inner = instagramEmbed || "<iframe src=\"".concat(src, "\" ").concat(attributes, " allowfullscreen></iframe>");
        }

        if (isHtml) {
          console.log('is html');
          inner = src;
        }

        var spinner = "<div class=\"position-absolute top-50 start-50 translate-middle text-white\"><div class=\"spinner-border\" style=\"width: 3rem height: 3rem\" role=\"status\"></div></div>";
        var params = new URLSearchParams(src.split('?')[1]);
        var caption = '';

        if (params.get('caption')) {
          caption = "<p class=\"lightbox-caption m-0 p-2 text-center text-white small\"><em>".concat(params.get('caption'), "</em></p>");
        }

        return "\n\t\t\t\t<div class=\"carousel-item ".concat(!i ? 'active' : '', "\" style=\"min-height: 100px\">\n\t\t\t\t\t").concat(spinner, "\n\t\t\t\t\t<div class=\"ratio ratio-16x9\" style=\"background-color: #000;\">").concat(inner, "</div>\n\t\t\t\t\t").concat(caption, "\n\t\t\t\t</div>");
      }).join('');
      var controlsHtml = this.sources.length < 2 ? '' : "\n\t\t\t<button id=\"#lightboxCarousel-".concat(this.hash, "-prev\" class=\"carousel-control carousel-control-prev h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-").concat(this.hash, "\" data-bs-slide=\"prev\">\n\t\t\t\t<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Previous</span>\n\t\t\t</button>\n\t\t\t<button id=\"#lightboxCarousel-").concat(this.hash, "-next\" class=\"carousel-control carousel-control-next h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-").concat(this.hash, "\" data-bs-slide=\"next\">\n\t\t\t\t<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Next</span>\n\t\t\t</button>");
      var classes = 'lightbox-carousel carousel';

      if (this.settings.size === 'fullscreen') {
        classes += ' position-absolute w-100 translate-middle top-50 start-50';
      }

      var html = "\n\t\t\t<div id=\"lightboxCarousel-".concat(this.hash, "\" class=\"").concat(classes, "\" data-bs-ride=\"carousel\" data-bs-interval=\"").concat(this.carouselOptions.interval, "\">\n\t\t\t\t<div class=\"carousel-inner\">\n\t\t\t\t\t").concat(slidesHtml, "\n\t\t\t\t</div>\n\t\t\t\t").concat(controlsHtml, "\n\t\t\t</div>");
      template.innerHTML = html.trim();
      this.carouselElement = template.content.firstChild;
      var carouselOptions = Object.assign(Object.assign({}, this.carouselOptions), {
        keyboard: false
      });
      this.carousel = new bootstrap.Carousel(this.carouselElement, carouselOptions);
      var elSrc = this.type && this.type !== 'image' ? this.type + this.src : this.src;
      this.carousel.to(this.sources.includes(elSrc) ? this.sources.indexOf(elSrc) : 0);

      if (this.carouselOptions.keyboard === true) {
        document.addEventListener('keydown', function (e) {
          if (e.code === 'ArrowLeft') {
            var prev = document.getElementById("#lightboxCarousel-".concat(_this4.hash, "-prev"));

            if (prev) {
              prev.click();
            }

            return false;
          }

          if (e.code === 'ArrowRight') {
            var next = document.getElementById("#lightboxCarousel-".concat(_this4.hash, "-next"));

            if (next) {
              next.click();
            }

            return false;
          }
        });
      }

      return this.carousel;
    }
  }, {
    key: "createModal",
    value: function createModal() {
      var _this5 = this;

      var template = document.createElement('template');
      var btnInner = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>';
      var html = "\n\t\t\t<div class=\"modal lightbox fade\" id=\"lightboxModal-".concat(this.hash, "\" tabindex=\"-1\" aria-hidden=\"true\">\n\t\t\t\t<div class=\"modal-dialog modal-dialog-centered modal-").concat(this.settings.size, "\">\n\t\t\t\t\t<div class=\"modal-content border-0 bg-transparent\">\n\t\t\t\t\t\t<div class=\"modal-body p-0\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn-close position-absolute top-0 end-0 p-3\" data-bs-dismiss=\"modal\" aria-label=\"Close\" style=\"z-index: 2; background: none;\">").concat(btnInner, "</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>");
      template.innerHTML = html.trim();
      this.modalElement = template.content.firstChild;
      this.modalElement.querySelector('.modal-body').appendChild(this.carouselElement);
      this.modalElement.addEventListener('hidden.bs.modal', function () {
        return _this5.modalElement.remove();
      });
      this.modalElement.querySelector('[data-bs-dismiss]').addEventListener('click', function () {
        return _this5.modal.hide();
      });
      this.modal = new bootstrap.Modal(this.modalElement, this.modalOptions);
      return this.modal;
    }
  }, {
    key: "randomHash",
    value: function randomHash() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
      return Array.from({
        length: length
      }, function () {
        return Math.floor(Math.random() * 36).toString(36);
      }).join('');
    }
  }]);

  return Lightbox;
}();

Lightbox.allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'];
Lightbox.allowedMediaTypes = [].concat(_toConsumableArray(Lightbox.allowedEmbedTypes), ['image', 'html']);
Lightbox.defaultSelector = '[data-toggle="lightbox"]';

Lightbox.initialize = function (e) {
  e.preventDefault();
  var lightbox = new Lightbox(this);
  lightbox.show();
};

document.querySelectorAll(Lightbox.defaultSelector).forEach(function (el) {
  return el.addEventListener('click', Lightbox.initialize);
});
window.bootstrap.Lightbox = Lightbox;
/* harmony default export */ __webpack_exports__["default"] = (Lightbox);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});