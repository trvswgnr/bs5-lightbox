/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = __importDefault(require("./bootstrap/modal"));
var carousel_1 = __importDefault(require("./bootstrap/carousel"));
var bootstrap = {
    Modal: modal_1.default,
    Carousel: carousel_1.default
};
var Lightbox = /** @class */ (function () {
    function Lightbox(el, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.hash = this.randomHash();
        this.settings = __assign(__assign(__assign({}, bootstrap.Modal.Default), bootstrap.Carousel.Default), { interval: false, target: '[data-toggle="lightbox"]', gallery: '' });
        this.modalOptions = (function () { return _this.setOptionsFromSettings(bootstrap.Modal.Default); })();
        this.carouselOptions = (function () { return _this.setOptionsFromSettings(bootstrap.Carousel.Default); })();
        if (typeof el === 'string') {
            this.settings.target = el;
            el = document.querySelector(this.settings.target);
        }
        this.settings = __assign(__assign({}, this.settings), options);
        this.el = el;
        this.type = el.dataset.type || 'image';
        this.src = this.getSrc(el);
        this.src = this.type !== 'image' ? 'embed' + this.src : this.src;
        this.sources = this.getGalleryItems();
        this.createCarousel();
        this.createModal();
    }
    Lightbox.prototype.show = function () {
        document.body.appendChild(this.modalElement);
        this.modal.show();
    };
    Lightbox.prototype.hide = function () {
        this.modal.hide();
    };
    Lightbox.prototype.setOptionsFromSettings = function (obj) {
        var _this = this;
        return Object.keys(obj).reduce(function (p, c) {
            var _a;
            return Object.assign(p, (_a = {}, _a[c] = _this.settings[c], _a));
        }, {});
    };
    Lightbox.prototype.getSrc = function (el) {
        return el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
    };
    Lightbox.prototype.getGalleryItems = function () {
        var _this = this;
        var galleryTarget;
        if (this.settings.gallery) {
            if (Array.isArray(this.settings.gallery)) {
                return this.settings.gallery;
            }
            galleryTarget = this.settings.gallery;
        }
        else if (this.el.dataset.gallery) {
            galleryTarget = this.el.dataset.gallery;
        }
        var gallery = galleryTarget
            ? __spreadArray([], __read(new Set(Array.from(document.querySelectorAll("[data-gallery=\"" + galleryTarget + "\"]"), function (v) { return "" + (v.dataset.type ? 'embed' : '') + _this.getSrc(v); }))), false) : [this.src];
        return gallery;
    };
    Lightbox.prototype.getYoutubeId = function (src) {
        if (!src)
            return false;
        var matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return matches && matches[2].length === 11 ? matches[2] : false;
    };
    Lightbox.prototype.getInstagramEmbed = function (src) {
        if (/instagram/.test(src)) {
            src += /\/embed$/.test(src) ? '' : '/embed';
            return "<div class=\"ratio ratio-16x9\" style=\"max-height: 100%;\"><iframe src=\"" + src + "\" class=\"start-50 translate-middle-x\" style=\"max-width: 500px\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe></div>";
        }
    };
    Lightbox.prototype.isEmbed = function (src) {
        var regex = new RegExp(Lightbox.allowedEmbedTypes.join('|'));
        var isEmbed = regex.test(src);
        var isImg = /\.(png|jpe?g|gif|svg|webp)/.test(src);
        return isEmbed || !isImg;
    };
    Lightbox.prototype.createCarousel = function () {
        var _this = this;
        var template = document.createElement('template');
        var slidesHtml = this.sources
            .map(function (src, i) {
            src = src.replace(/\/$/, '');
            var onload = '';
            onload += /\.png/.test(src) ? "this.add.previousSibling.remove()" : '';
            var inner = "<div class=\"ratio ratio-16x9\"><img src=\"" + src + "\" class=\"d-block w-100 h-100 img-fluid\" style=\"z-index: 1; object-fit: contain;\" onload=\"" + onload + "\" /></div>";
            var attributes = '';
            var instagramEmbed = _this.getInstagramEmbed(src);
            var youtubeId = _this.getYoutubeId(src);
            if (_this.isEmbed(src)) {
                if (/^embed/.test(src))
                    src = src.substring(5);
                if (youtubeId) {
                    src = "https://www.youtube.com/embed/" + youtubeId;
                    attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"';
                }
                inner = instagramEmbed || "<div class=\"ratio ratio-16x9\"><iframe src=\"" + src + "\" " + attributes + " allowfullscreen></iframe></div>";
            }
            var spinner = "<div class=\"position-absolute top-50 start-50 translate-middle text-white\"><div class=\"spinner-border\" style=\"width: 3rem height: 3rem\" role=\"status\"></div></div>";
            return "<div class=\"carousel-item " + (!i ? 'active' : '') + "\" style=\"min-height: 100px\">" + spinner + inner + "</div>";
        })
            .join('');
        var controlsHtml = this.sources.length < 2
            ? ''
            : "\n\t\t\t<button class=\"carousel-control carousel-control-prev h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-" + this.hash + "\" data-bs-slide=\"prev\">\n\t\t\t\t<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Previous</span>\n\t\t\t</button>\n\t\t\t<button class=\"carousel-control carousel-control-next h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-" + this.hash + "\" data-bs-slide=\"next\">\n\t\t\t\t<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Next</span>\n\t\t\t</button>";
        var html = "\n\t\t\t<div id=\"lightboxCarousel-" + this.hash + "\" class=\"lightbox-carousel carousel\" data-bs-ride=\"carousel\">\n\t\t\t\t<div class=\"carousel-inner\">\n\t\t\t\t\t" + slidesHtml + "\n\t\t\t\t</div>\n\t\t\t\t" + controlsHtml + "\n\t\t\t</div>";
        template.innerHTML = html.trim();
        this.carouselElement = template.content.firstChild;
        this.carousel = new bootstrap.Carousel(this.carouselElement, this.carouselOptions);
        this.carousel.to(this.sources.includes(this.src) ? this.sources.indexOf(this.src) : 0);
        // this.carouselElement.querySelector('[data-bs-slide="prev"]').addEventListener('click', this.carousel.prev)
        return this.carousel;
    };
    Lightbox.prototype.createModal = function () {
        var _this = this;
        var template = document.createElement('template');
        var btnInner = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>)';
        var html = "\n\t\t\t<div class=\"modal lightbox fade\" id=\"lightboxModal-" + this.hash + "\" tabindex=\"-1\" aria-hidden=\"true\">\n\t\t\t\t<div class=\"modal-dialog modal-dialog-centered modal-xl\">\n\t\t\t\t\t<div class=\"modal-content border-0\" style=\"background: black\">\n\t\t\t\t\t\t<div class=\"modal-body p-0\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn-close position-absolute top-0 end-0 p-3\" data-bs-dismiss=\"modal\" aria-label=\"Close\" style=\"z-index: 2; background: none;\">" + btnInner + "</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>";
        template.innerHTML = html.trim();
        this.modalElement = template.content.firstChild;
        this.modalElement.querySelector('.modal-body').appendChild(this.carouselElement);
        this.modalElement.addEventListener('hidden.bs.modal', function () { return _this.modalElement.remove(); });
        this.modal = new bootstrap.Modal(this.modalElement, this.modalOptions);
        return this.modal;
    };
    Lightbox.prototype.randomHash = function (length) {
        if (length === void 0) { length = 8; }
        return Array.from({ length: length }, function () { return Math.floor(Math.random() * 36).toString(36); }).join('');
    };
    Lightbox.allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'];
    Lightbox.allowedMediaTypes = __spreadArray(__spreadArray([], __read(Lightbox.allowedEmbedTypes), false), ['image'], false);
    Lightbox.defaultSelector = '[data-toggle="lightbox"]';
    return Lightbox;
}());
document.querySelectorAll(Lightbox.defaultSelector).forEach(function (el) {
    return el.addEventListener('click', function (e) {
        e.preventDefault();
        var lightbox = new Lightbox(el);
        lightbox.show();
    });
});
exports.default = Lightbox;
