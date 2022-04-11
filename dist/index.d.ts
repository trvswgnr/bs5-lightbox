/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */
declare class Lightbox {
	static allowedEmbedTypes: readonly ['embed', 'youtube', 'vimeo', 'instagram', 'url'];
	static allowedMediaTypes: readonly ['embed', 'youtube', 'vimeo', 'instagram', 'url', 'image', 'html'];
	static defaultSelector: '[data-toggle="lightbox"]';
	constructor(el: string | HTMLElement, options?: any);
	private hash;
	private settings;
	modalOptions: bootstrap.Modal.Options;
	carouselOptions: bootstrap.Carousel.Options;
	carouselElement: HTMLElement;
	modalElement: HTMLElement;
	modal: bootstrap.Modal;
	carousel: bootstrap.Carousel;
	sources: string[];
	src: string;
	type: Lightbox.AllowedMedia;
	el: HTMLElement;
	static initialize: (e: Event) => void;
	show(): void;
	hide(): void;
	private setOptionsFromSettings;
	private getSrc;
	private getGalleryItems;
	private getYoutubeId;
	private getInstagramEmbed;
	private isEmbed;
	private createCarousel;
	private createModal;
	private randomHash;
}
declare namespace Lightbox {
	type AllowedMedia = typeof Lightbox.allowedMediaTypes[number];
	interface Options extends bootstrap.Modal.Options, bootstrap.Carousel.Options {
		target: string | HTMLElement;
		gallery: string | string[];
		size: 'default' | 'sm' | 'lg' | 'xl' | 'fullscreen';
		constrain: boolean;
	}
}
export default Lightbox;
