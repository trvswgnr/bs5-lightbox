"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _modal = _interopRequireDefault(require("./bootstrap/modal"));

var _carousel = _interopRequireDefault(require("./bootstrap/carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bootstrap = {
  Modal: _modal.default,
  Carousel: _carousel.default
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
      gallery: ''
    });

    this.modalOptions = function () {
      return _this.setOptionsFromSettings(bootstrap.Modal.Default);
    }();

    this.carouselOptions = function () {
      return _this.setOptionsFromSettings(bootstrap.Carousel.Default);
    }();

    console.log();

    if (typeof el === 'string') {
      this.settings.target = el;
      el = document.querySelector(this.settings.target);
      options = typeof arguments[1] !== 'undefined' ? arguments[1] : {};
    }

    this.settings = Object.assign(Object.assign({}, this.settings), options);
    this.el = el;
    this.type = el.dataset.type || 'image';
    this.src = this.getSrc(el);
    this.src = this.type !== 'image' ? 'embed' + this.src : this.src;
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
      return el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
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
        return "".concat(v.dataset.type ? 'embed' : '').concat(_this3.getSrc(v));
      }))) : [this.src];
      return gallery;
    }
  }, {
    key: "getYoutubeId",
    value: function getYoutubeId(src) {
      if (!src) return false;
      var matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
      return matches && matches[2].length === 11 ? matches[2] : false;
    }
  }, {
    key: "getInstagramEmbed",
    value: function getInstagramEmbed(src) {
      if (/instagram/.test(src)) {
        src += /\/embed$/.test(src) ? '' : '/embed';
        return "<div class=\"ratio ratio-16x9\" style=\"max-height: 100%;\"><iframe src=\"".concat(src, "\" class=\"start-50 translate-middle-x\" style=\"max-width: 500px\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe></div>");
      }
    }
  }, {
    key: "isEmbed",
    value: function isEmbed(src) {
      var regex = new RegExp(Lightbox.allowedEmbedTypes.join('|'));
      var isEmbed = regex.test(src);
      var isImg = /\.(png|jpe?g|gif|svg|webp)/.test(src);
      return isEmbed || !isImg;
    }
  }, {
    key: "createCarousel",
    value: function createCarousel() {
      var _this4 = this;

      var template = document.createElement('template');
      var slidesHtml = this.sources.map(function (src, i) {
        src = src.replace(/\/$/, '');
        var onload = '';
        onload += /\.png/.test(src) ? "this.add.previousSibling.remove()" : '';
        var inner = "<div class=\"ratio ratio-16x9\"><img src=\"".concat(src, "\" class=\"d-block w-100 h-100 img-fluid\" style=\"z-index: 1; object-fit: contain;\" onload=\"").concat(onload, "\" /></div>");
        var attributes = '';

        var instagramEmbed = _this4.getInstagramEmbed(src);

        var youtubeId = _this4.getYoutubeId(src);

        if (_this4.isEmbed(src)) {
          if (/^embed/.test(src)) src = src.substring(5);

          if (youtubeId) {
            src = "https://www.youtube.com/embed/".concat(youtubeId);
            attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"';
          }

          inner = instagramEmbed || "<div class=\"ratio ratio-16x9\"><iframe src=\"".concat(src, "\" ").concat(attributes, " allowfullscreen></iframe></div>");
        }

        var spinner = "<div class=\"position-absolute top-50 start-50 translate-middle text-white\"><div class=\"spinner-border\" style=\"width: 3rem height: 3rem\" role=\"status\"></div></div>";
        return "<div class=\"carousel-item ".concat(!i ? 'active' : '', "\" style=\"min-height: 100px\">").concat(spinner).concat(inner, "</div>");
      }).join('');
      var controlsHtml = this.sources.length < 2 ? '' : "\n\t\t\t<button class=\"carousel-control carousel-control-prev h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-".concat(this.hash, "\" data-bs-slide=\"prev\">\n\t\t\t\t<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Previous</span>\n\t\t\t</button>\n\t\t\t<button class=\"carousel-control carousel-control-next h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-").concat(this.hash, "\" data-bs-slide=\"next\">\n\t\t\t\t<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Next</span>\n\t\t\t</button>");
      var html = "\n\t\t\t<div id=\"lightboxCarousel-".concat(this.hash, "\" class=\"lightbox-carousel carousel\" data-bs-ride=\"carousel\">\n\t\t\t\t<div class=\"carousel-inner\">\n\t\t\t\t\t").concat(slidesHtml, "\n\t\t\t\t</div>\n\t\t\t\t").concat(controlsHtml, "\n\t\t\t</div>");
      template.innerHTML = html.trim();
      this.carouselElement = template.content.firstChild;
      this.carousel = new bootstrap.Carousel(this.carouselElement, this.carouselOptions);
      this.carousel.to(this.sources.includes(this.src) ? this.sources.indexOf(this.src) : 0); // this.carouselElement.querySelector('[data-bs-slide="prev"]').addEventListener('click', this.carousel.prev)

      return this.carousel;
    }
  }, {
    key: "createModal",
    value: function createModal() {
      var _this5 = this;

      var template = document.createElement('template');
      var btnInner = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>)';
      var html = "\n\t\t\t<div class=\"modal lightbox fade\" id=\"lightboxModal-".concat(this.hash, "\" tabindex=\"-1\" aria-hidden=\"true\">\n\t\t\t\t<div class=\"modal-dialog modal-dialog-centered modal-xl\">\n\t\t\t\t\t<div class=\"modal-content border-0\" style=\"background: black\">\n\t\t\t\t\t\t<div class=\"modal-body p-0\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn-close position-absolute top-0 end-0 p-3\" data-bs-dismiss=\"modal\" aria-label=\"Close\" style=\"z-index: 2; background: none;\">").concat(btnInner, "</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>");
      template.innerHTML = html.trim();
      this.modalElement = template.content.firstChild;
      this.modalElement.querySelector('.modal-body').appendChild(this.carouselElement);
      this.modalElement.addEventListener('hidden.bs.modal', function (e) {
        return _this5.modalElement.remove();
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
Lightbox.allowedMediaTypes = [].concat(_toConsumableArray(Lightbox.allowedEmbedTypes), ['image']);
Lightbox.defaultSelector = '[data-toggle="lightbox"]';
document.querySelectorAll(Lightbox.defaultSelector).forEach(function (el) {
  return el.addEventListener('click', function (e) {
    e.preventDefault();
    var lightbox = new Lightbox(el);
    lightbox.show();
  });
});
var _default = Lightbox;
exports.default = _default;
