/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */

import * as bootstrap from 'bootstrap';

class Lightbox {
	#settings = {
		target: '[data-toggle="lightbox"]'
	}

	#types = ['embed', 'youtube', 'vimeo', 'instagram']

	#hash = this.#randomHash();

	constructor(options = {}) {
		if (typeof options === 'string') {
			this.#settings.target = options;
			options = typeof arguments[1] !== 'undefined' ? arguments[1] : {};
		}

		this.#settings = {
			...this.#settings,
			...options
		};

		document.querySelectorAll(this.#settings.target).forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault();
				this.el = el;
				this.type = el.dataset.type || 'image';
				this.src = this.#getSrc(el);
				this.src = this.type !== 'image' ? 'embed' + this.src : this.src;
				this.sources = this.#getGalleryItems();
				this.#createCarousel();
				this.#createModal();
			});
		});
	}

	#getSrc(el) {
		return el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
	}

	#getGalleryItems() {
		let galleryTarget = '';
		if (this.#settings.gallery) {
			if (Array.isArray(this.#settings.gallery)) {
				return this.#settings.gallery;
			}
			galleryTarget = this.#settings.gallery;
		} else if (this.el.dataset.gallery) {
			galleryTarget = this.el.dataset.gallery;
		}
		const gallery = galleryTarget ? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`), v => `${v.dataset.type ? 'embed' : ''}${this.#getSrc(v)}`))] : [this.src];
		return gallery; 
	}

	#getYoutubeId(string) {
		if (!string) return false;
		let matches = string.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
		return (matches && matches[2].length === 11) ? matches[2] : false;
	}

	#getInstagramEmbed(src) {
		if (/instagram/.test(src)) {
			src += /\/embed$/.test(src) ? '' : '/embed';
			return `<div class="ratio ratio-1x1" style="max-height: 69vh;"><iframe src="${src}" class="start-50 translate-middle-x" style="max-width: 500px;" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>`;
		}
	}

	#isEmbed(src) {
		const regex = new RegExp(this.#types.join('|'));
		const isEmbed = regex.test(src);
		const isImg = /\.(png|jpe?g|gif|svg|webp)/.test(src);
		return isEmbed || !isImg;
	}

	#createCarousel() {
		const template = document.createElement('template');
		const slidesHtml = this.sources.map((src, i) => {
			src = src.replace(/\/$/, '');
			let onload = 'this.style.opacity = 1;';
			onload += /\.png/.test(src) ? `this.add.previousSibling.remove();` : '';
			let inner = `<img src="${src}" class="d-block w-100 position-relative" style="z-index: 1; opacity: 0;" onload="${onload}" />`;
			let attributes = '';
			const instagramEmbed = this.#getInstagramEmbed(src);
			const youtubeId = this.#getYoutubeId(src);
			if (this.#isEmbed(src)) {
				if (/^embed/.test(src)) src = src.substring(5);
				if (youtubeId) {
					src = `https://www.youtube.com/embed/${youtubeId}`;
					attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"';
				}
				inner = instagramEmbed || `<div class="ratio ratio-16x9"><iframe src="${src}" ${attributes} allowfullscreen></iframe></div>`;
			}
			const spinner = `<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></div></div>`;
			return `<div class="carousel-item ${!i ? 'active' : ''}" style="min-height: 100px;">${spinner}${inner}</div>`
		}).join('');
		const controlsHtml = this.sources.length < 2 ? '' : `
			<button class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.#hash}" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.#hash}" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>`;

		const html = `
			<div id="lightboxCarousel-${this.#hash}" class="lightbox-carousel carousel" data-interval="false">
				<div class="carousel-inner">
					${slidesHtml}
				</div>
				${controlsHtml}
			</div>`;

		template.innerHTML = html.trim();
		this.carouselEl = template.content.firstChild;
		this.carousel = new bootstrap.Carousel(this.carouselEl, {
			ride: false,
			interval: false
		});
		this.carousel.to(this.sources.includes(this.src) ? this.sources.indexOf(this.src) : 0);
	}

	#createModal() {
		const template = document.createElement('template');
		const html = `
			<div class="modal lightbox fade" id="lightboxModal-${this.#hash}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-xl">
					<div class="modal-content border-0 bg-transparent">
						<div class="modal-body p-0">
							<button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2;"></button>
						</div>
					</div>
				</div>
			</div>`;

		template.innerHTML = html.trim();

		this.modalEl = template.content.firstChild;
		this.modalEl.querySelector('.modal-body').appendChild(this.carouselEl);
		this.modalEl.addEventListener('hidden.bs.modal', e => this.modalEl.remove());
		document.body.appendChild(this.modalEl);

		this.modal = new bootstrap.Modal(this.modalEl);
		this.modal.show();
	}

	/**
	 * Generate a random hash of a determined length
	 *
	 * @param {number} length Length of the hash to generate
	 * @returns Random hash
	 */
	#randomHash(length = 8) {
		return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
	}
}

export default Lightbox;
