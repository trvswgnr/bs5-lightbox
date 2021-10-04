/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */

import Modal from './bootstrap/modal'
import Carousel from './bootstrap/carousel'

const bootstrap = {
	Modal,
	Carousel
}

class Lightbox {
	static allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'] as const
	static allowedMediaTypes = [...Lightbox.allowedEmbedTypes, 'image'] as const
	static defaultSelector = '[data-toggle="lightbox"]' as const

	constructor(el: string | HTMLElement, options: any = {}) {
		console.log()
		if (typeof el === 'string') {
			this.settings.target = el
			el = document.querySelector(this.settings.target) as HTMLElement
			options = typeof arguments[1] !== 'undefined' ? arguments[1] : {}
		}

		this.settings = {
			...this.settings,
			...options
		}

		this.el = el
		this.type = el.dataset.type as Lightbox.AllowedMedia || 'image'
		this.src = this.getSrc(el)
		this.src = this.type !== 'image' ? 'embed' + this.src : this.src
		this.sources = this.getGalleryItems()
		this.createCarousel()
		this.createModal()
	}

	private hash: string = this.randomHash()

	private settings: Lightbox.Options = {
		...bootstrap.Modal.Default,
		...bootstrap.Carousel.Default,
		interval: false,
		target: '[data-toggle="lightbox"]',
		gallery: ''
	}

	public modalOptions: bootstrap.Modal.Options = (() => this.setOptionsFromSettings(bootstrap.Modal.Default))()
	public carouselOptions: bootstrap.Carousel.Options = (() => this.setOptionsFromSettings(bootstrap.Carousel.Default))()
	public carouselElement: HTMLElement
	public modalElement: HTMLElement
	public modal: bootstrap.Modal
	public carousel: bootstrap.Carousel
	public sources: string[]
	public src: string
	public type: Lightbox.AllowedMedia
	public el: HTMLElement

	public show() {
		document.body.appendChild(this.modalElement)
		this.modal.show()
	}

	public hide() {
		this.modal.hide()
	}

	private setOptionsFromSettings(obj: any) {
		return Object.keys(obj).reduce((p: any, c: keyof Lightbox.Options) => Object.assign(p, {[c]: this.settings[c]}), {})
	}

	private getSrc(el: HTMLElement): string {
		return el.dataset.src || el.dataset.remote || (el as HTMLAnchorElement).href || 'http://via.placeholder.com/1600x900'
	}

	private getGalleryItems(): string[] {
		let galleryTarget: string | string[]
		if (this.settings.gallery) {
			if (Array.isArray(this.settings.gallery)) {
				return this.settings.gallery
			}
			galleryTarget = this.settings.gallery
		} else if (this.el.dataset.gallery) {
			galleryTarget = this.el.dataset.gallery
		}
		const gallery = galleryTarget ? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`), (v: HTMLElement) => `${v.dataset.type ? 'embed' : ''}${this.getSrc(v)}`))] : [this.src]
		return gallery
	}

	private getYoutubeId(src: string): string | false {
		if (!src) return false
		let matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
		return (matches && matches[2].length === 11) ? matches[2] : false
	}

	private getInstagramEmbed(src: string): string {
		if (/instagram/.test(src)) {
			src += /\/embed$/.test(src) ? '' : '/embed'
			return `<div class="ratio ratio-16x9" style="max-height: 100%;"><iframe src="${src}" class="start-50 translate-middle-x" style="max-width: 500px" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>`
		}
	}

	private isEmbed(src: string): boolean {
		const regex = new RegExp(Lightbox.allowedEmbedTypes.join('|'))
		const isEmbed = regex.test(src)
		const isImg = /\.(png|jpe?g|gif|svg|webp)/.test(src)
		return isEmbed || !isImg
	}

	private createCarousel(): bootstrap.Carousel {
		const template = document.createElement('template')

		const slidesHtml = this.sources.map((src, i) => {
			src = src.replace(/\/$/, '')
			let onload = ''
			onload += /\.png/.test(src) ? `this.add.previousSibling.remove()` : ''
			let inner = `<div class="ratio ratio-16x9"><img src="${src}" class="d-block w-100 h-100 img-fluid" style="z-index: 1; object-fit: contain;" onload="${onload}" /></div>`
			let attributes = ''
			const instagramEmbed = this.getInstagramEmbed(src)
			const youtubeId = this.getYoutubeId(src)
			if (this.isEmbed(src)) {
				if (/^embed/.test(src)) src = src.substring(5)
				if (youtubeId) {
					src = `https://www.youtube.com/embed/${youtubeId}`
					attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"'
				}
				inner = instagramEmbed || `<div class="ratio ratio-16x9"><iframe src="${src}" ${attributes} allowfullscreen></iframe></div>`
			}
			const spinner = `<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem height: 3rem" role="status"></div></div>`
			return `<div class="carousel-item ${!i ? 'active' : ''}" style="min-height: 100px">${spinner}${inner}</div>`
		}).join('')

		const controlsHtml = this.sources.length < 2 ? '' : `
			<button class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>`

		const html = `
			<div id="lightboxCarousel-${this.hash}" class="lightbox-carousel carousel" data-bs-ride="carousel">
				<div class="carousel-inner">
					${slidesHtml}
				</div>
				${controlsHtml}
			</div>`

		template.innerHTML = html.trim()
		this.carouselElement = (template.content.firstChild as HTMLElement)
		this.carousel = new bootstrap.Carousel(this.carouselElement, this.carouselOptions)
		this.carousel.to(this.sources.includes(this.src) ? this.sources.indexOf(this.src) : 0)
		// this.carouselElement.querySelector('[data-bs-slide="prev"]').addEventListener('click', this.carousel.prev)
		return this.carousel
	}

	private createModal(): bootstrap.Modal {
		const template = document.createElement('template')
		const btnInner = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>)'
		const html = `
			<div class="modal lightbox fade" id="lightboxModal-${this.hash}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-xl">
					<div class="modal-content border-0" style="background: black">
						<div class="modal-body p-0">
							<button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2; background: none;">${btnInner}</button>
						</div>
					</div>
				</div>
			</div>`

		template.innerHTML = html.trim()

		this.modalElement = (template.content.firstChild as HTMLElement)
		this.modalElement.querySelector('.modal-body').appendChild(this.carouselElement)
		this.modalElement.addEventListener('hidden.bs.modal', (e: Event) => this.modalElement.remove())
		this.modal = new bootstrap.Modal(this.modalElement, this.modalOptions)
		return this.modal
	}

	private randomHash(length: number = 8): string {
		return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('')
	}
}

namespace Lightbox {
	export type AllowedMedia = typeof Lightbox.allowedMediaTypes[number]
	export interface Options extends bootstrap.Modal.Options, bootstrap.Carousel.Options {
		target: string | HTMLElement
		gallery: string | string[]
	}
}

document.querySelectorAll(Lightbox.defaultSelector).forEach((el: HTMLElement) => el.addEventListener('click', (e) => {
    e.preventDefault();
    const lightbox = new Lightbox(el);
    lightbox.show();
}));

export default Lightbox
