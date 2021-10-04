/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("./bootstrap/modal"));
const carousel_1 = __importDefault(require("./bootstrap/carousel"));
const bootstrap = {
    Modal: modal_1.default,
    Carousel: carousel_1.default
};
class Lightbox {
    constructor(el, options = {}) {
        this.hash = this.randomHash();
        this.settings = Object.assign(Object.assign(Object.assign({}, bootstrap.Modal.Default), bootstrap.Carousel.Default), { interval: false, target: '[data-toggle="lightbox"]', gallery: '' });
        this.modalOptions = (() => this.setOptionsFromSettings(bootstrap.Modal.Default))();
        this.carouselOptions = (() => this.setOptionsFromSettings(bootstrap.Carousel.Default))();
        if (typeof el === 'string') {
            this.settings.target = el;
            el = document.querySelector(this.settings.target);
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
        return el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
    }
    getGalleryItems() {
        let galleryTarget;
        if (this.settings.gallery) {
            if (Array.isArray(this.settings.gallery)) {
                return this.settings.gallery;
            }
            galleryTarget = this.settings.gallery;
        }
        else if (this.el.dataset.gallery) {
            galleryTarget = this.el.dataset.gallery;
        }
        const gallery = galleryTarget
            ? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`), (v) => `${v.dataset.type ? 'embed' : ''}${this.getSrc(v)}`))]
            : [this.src];
        return gallery;
    }
    getYoutubeId(src) {
        if (!src)
            return false;
        const matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return matches && matches[2].length === 11 ? matches[2] : false;
    }
    getInstagramEmbed(src) {
        if (/instagram/.test(src)) {
            src += /\/embed$/.test(src) ? '' : '/embed';
            return `<div class="ratio ratio-16x9" style="max-height: 100%;"><iframe src="${src}" class="start-50 translate-middle-x" style="max-width: 500px" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>`;
        }
    }
    isEmbed(src) {
        const regex = new RegExp(Lightbox.allowedEmbedTypes.join('|'));
        const isEmbed = regex.test(src);
        const isImg = /\.(png|jpe?g|gif|svg|webp)/.test(src);
        return isEmbed || !isImg;
    }
    createCarousel() {
        const template = document.createElement('template');
        const slidesHtml = this.sources
            .map((src, i) => {
            src = src.replace(/\/$/, '');
            let onload = '';
            onload += /\.png/.test(src) ? `this.add.previousSibling.remove()` : '';
            let inner = `<div class="ratio ratio-16x9"><img src="${src}" class="d-block w-100 h-100 img-fluid" style="z-index: 1; object-fit: contain;" onload="${onload}" /></div>`;
            let attributes = '';
            const instagramEmbed = this.getInstagramEmbed(src);
            const youtubeId = this.getYoutubeId(src);
            if (this.isEmbed(src)) {
                if (/^embed/.test(src))
                    src = src.substring(5);
                if (youtubeId) {
                    src = `https://www.youtube.com/embed/${youtubeId}`;
                    attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"';
                }
                inner = instagramEmbed || `<div class="ratio ratio-16x9"><iframe src="${src}" ${attributes} allowfullscreen></iframe></div>`;
            }
            const spinner = `<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem height: 3rem" role="status"></div></div>`;
            return `<div class="carousel-item ${!i ? 'active' : ''}" style="min-height: 100px">${spinner}${inner}</div>`;
        })
            .join('');
        const controlsHtml = this.sources.length < 2
            ? ''
            : `
			<button class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>`;
        const html = `
			<div id="lightboxCarousel-${this.hash}" class="lightbox-carousel carousel" data-bs-ride="carousel">
				<div class="carousel-inner">
					${slidesHtml}
				</div>
				${controlsHtml}
			</div>`;
        template.innerHTML = html.trim();
        this.carouselElement = template.content.firstChild;
        this.carousel = new bootstrap.Carousel(this.carouselElement, this.carouselOptions);
        this.carousel.to(this.sources.includes(this.src) ? this.sources.indexOf(this.src) : 0);
        // this.carouselElement.querySelector('[data-bs-slide="prev"]').addEventListener('click', this.carousel.prev)
        return this.carousel;
    }
    createModal() {
        const template = document.createElement('template');
        const btnInner = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>)';
        const html = `
			<div class="modal lightbox fade" id="lightboxModal-${this.hash}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-xl">
					<div class="modal-content border-0" style="background: black">
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
        this.modal = new bootstrap.Modal(this.modalElement, this.modalOptions);
        return this.modal;
    }
    randomHash(length = 8) {
        return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
    }
}
Lightbox.allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'];
Lightbox.allowedMediaTypes = [...Lightbox.allowedEmbedTypes, 'image'];
Lightbox.defaultSelector = '[data-toggle="lightbox"]';
document.querySelectorAll(Lightbox.defaultSelector).forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    const lightbox = new Lightbox(el);
    lightbox.show();
}));
exports.default = Lightbox;
