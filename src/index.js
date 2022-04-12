import { defineJQueryPlugin, getElementFromSelector, isRTL, isVisible, reflow, typeCheckConfig } from 'bootstrap/js/src/util/index';
import EventHandler from 'bootstrap/js/dist/dom/event-handler';
import Manipulator from 'bootstrap/js/src/dom/manipulator';
import SelectorEngine from 'bootstrap/js/dist/dom/selector-engine';
import BaseComponent from 'bootstrap/js/src/base-component';
import FocusTrap from 'bootstrap/js/src/util/focustrap';
import { enableDismissTrigger } from 'bootstrap/js/src/util/component-functions';
import { Modal, Carousel } from 'bootstrap';

const NAME = 'lightbox';
const DATA_KEY = `bs.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';
const ESCAPE_KEY = 'Escape';

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_RESIZE = `resize${EVENT_KEY}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

const CLASS_NAME_OPEN = `${NAME}-open`;

const OPEN_SELECTOR = `.${NAME}.show`;
const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"]`;

const BS_MODAL_EVENTS = ['show.bs.modal', 'shown.bs.modal', 'hide.bs.modal', 'hidden.bs.modal', 'hidePrevented.bs.modal'];
const BS_CAROUSEL_EVENTS = ['slide.bs.carousel', 'slid.bs.carousel'];

const randomHash = (length = 8) => {
	return 'L' + Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
};

const createModalEl = (modalContent) => {
	const div = document.createElement('div');
	div.classList.add('modal', 'fade', 'lightbox');
	div.id = randomHash();
	div.innerHTML = `
		<div class="modal-dialog lightbox-dialog modal-dialog-centered">
			<div class="modal-content lightbox-content">
				<div class="modal-header lightbox-header">
					<h5 class="modal-title lightbox-title" id="${div.id}">Lightbox title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="lightbox" aria-label="Close"></button>
				</div>
				<div class="modal-body lightbox-body"></div>
				<div class="modal-footer">
				
  <button type="button" id="testLightbox2" class="btn btn-secondary" data-bs-toggle="lightbox">
  Launch demo lightbox2
</button></div>
			</div>
		</div>`;
	div.querySelector('.lightbox-body').append(modalContent);
	return div;
};

const createCarouseEl = (slidesData = []) => {
	const div = document.createElement('div');
	div.id = randomHash();
	div.classList.add('carousel', 'slide');
	div.innerHTML = `
		<div class="carousel-inner bg-dark text-white">
			<div class="carousel-item active">
				<p>Slide 1</p>
			</div>
			<div class="carousel-item">
				<p>Slide 2</p>
			</div>
			<div class="carousel-item">
				<p>Slide 3</p>
			</div>
		</div>
		<button class="carousel-control-prev" type="button" data-bs-target="#${div.id}" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#${div.id}" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>`;
	return div;
};

const modalEventsHandler = (element, event) => {
	const args = Object.fromEntries(Object.getOwnPropertyNames(event).map((prop) => [prop, event[prop]]));
	delete args.isTrusted;
	const type = event.type.replace(/(modal|carousel)/, 'lightbox');
	// const allowedKeys = ['direction', 'relatedTarget', 'from', 'to'];
	// console.log('event', event);
	// for (const key in args) console.log(key, args[key]);
	console.log('initial event', event);
	EventHandler.trigger(element, type, args);
};

class Lightbox extends Modal {
	constructor(element, config) {
		const carouselEl = createCarouseEl();
		new Carousel(carouselEl, {
			interval: false,
			ride: false
		});
		const modalEl = createModalEl(carouselEl);
		super(modalEl, config);
		this.carouselEl = carouselEl;
		this.modalEl = modalEl;
		this._setupEventListeners();
	}

	// Public

	// Private

	_setupEventListeners() {
		const LB_EVENTS = [...BS_MODAL_EVENTS, ...BS_CAROUSEL_EVENTS].map((v) => v.replace(/(modal|carousel)/gi, 'lightbox'));
		LB_EVENTS.map((eventName) => this._element.addEventListener(eventName, (event) => console.log('lightbox event', event)));
		BS_MODAL_EVENTS.map((eventName) => this._element.addEventListener(eventName, (event) => modalEventsHandler(this._element, event)));
		BS_CAROUSEL_EVENTS.map((eventName) => this.carouselEl.addEventListener(eventName, (event) => modalEventsHandler(this._element, event)));

		this._element.addEventListener('hidden.bs.modal', () => {
			document.body.classList.remove(CLASS_NAME_OPEN);
			this._element.remove();
		});
	}

	// Static

	static get NAME() {
		return NAME;
	}

	static get EVENT_CLICK_DATA_API() {
		return EVENT_CLICK_DATA_API;
	}

	static initialize(event) {
		if (['A', 'AREA'].includes(this.tagName)) {
			event.preventDefault();
		}

		// avoid conflict when clicking modal toggler while another one is open
		const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
		if (alreadyOpen) {
			Lightbox.getInstance(alreadyOpen).hide();
		}

		const data = Lightbox.getOrCreateInstance(this);

		const target = data.modalEl;

		EventHandler.one(target, EVENT_SHOW, (showEvent) => {
			if (showEvent.defaultPrevented) {
				// only register focus restorer if modal will actually get shown
				return;
			}

			EventHandler.one(target, EVENT_HIDDEN, () => {
				if (isVisible(this)) {
					this.focus();
				}
			});
		});

		data.toggle(this);
	}

	static jQueryInterface(config, relatedTarget) {
		return this.each(function () {
			const data = Lightbox.getOrCreateInstance(this, config);

			if (typeof config !== 'string') {
				return;
			}

			if (typeof data[config] === 'undefined') {
				throw new TypeError(`No method named "${config}"`);
			}

			data[config](relatedTarget);
		});
	}
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, Lightbox.initialize);

enableDismissTrigger(Lightbox);

// EventHandler.off(document, Lightbox.EVENT_CLICK_DATA_API);

/**
 * jQuery
 */

defineJQueryPlugin(Lightbox);

export default Lightbox;
