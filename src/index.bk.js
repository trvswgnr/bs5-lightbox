import { defineJQueryPlugin, getElementFromSelector, isRTL, isVisible, reflow, typeCheckConfig } from 'bootstrap/js/src/util/index';
import EventHandler from 'bootstrap/js/src/dom/event-handler';
import Manipulator from 'bootstrap/js/src/dom/manipulator';
import SelectorEngine from 'bootstrap/js/src/dom/selector-engine';
import BaseComponent from 'bootstrap/js/src/base-component';
import FocusTrap from 'bootstrap/js/src/util/focustrap';
import { enableDismissTrigger } from 'bootstrap/js/src/util/component-functions';
import { Modal, Carousel } from 'bootstrap';

const NAME = 'lightbox';
const DATA_KEY = 'bs.lightbox';
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';
const ESCAPE_KEY = 'Escape';

const Default = {
	keyboard: true,
	focus: true
};

const DefaultType = {
	keyboard: 'boolean',
	focus: 'boolean'
};

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_RESIZE = `resize${EVENT_KEY}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

const CLASS_NAME_OPEN = 'lightbox-open';
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_SHOW = 'show';

const OPEN_SELECTOR = '.lightbox.show';
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="lightbox"]';
class Lightbox extends BaseComponent {
	constructor(element, config) {
		super(element);

		this._config = this._getConfig(config);
		this._focustrap = this._initializeFocusTrap();
		this._isShown = false;
		this._isTransitioning = false;
		this._modalEl = this._createModalEl();
		this._modal = new Modal(this._modalEl);
		this._triggerEvents();
	}

	// Getters

	static get Default() {
		return Default;
	}

	static get NAME() {
		return NAME;
	}

	// Public

	toggle(relatedTarget) {
		return this._isShown ? this.hide() : this.show(relatedTarget);
	}

	show(relatedTarget) {
		if (this._isShown || this._isTransitioning) {
			return;
		}

		const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
			relatedTarget
		});

		if (showEvent.defaultPrevented) {
			return;
		}

		this._isShown = true;
		this._isTransitioning = true;

		this._modal.show();
		document.body.classList.add(CLASS_NAME_OPEN);
	}

	hide() {
		if (!this._isShown || this._isTransitioning) {
			return;
		}

		const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

		if (hideEvent.defaultPrevented) {
			return;
		}

		this._isShown = false;
		this._isTransitioning = true;

		document.body.classList.remove(CLASS_NAME_OPEN);
	}

	dispose() {
		super.dispose();
	}

	handleUpdate() {}

	// Private

	_initializeFocusTrap() {
		return new FocusTrap({
			trapElement: this._element
		});
	}

	_getConfig(config) {
		config = {
			...Default,
			...Manipulator.getDataAttributes(this._element),
			...(typeof config === 'object' ? config : {})
		};
		typeCheckConfig(NAME, config, DefaultType);
		return config;
	}

	_createModalEl() {
		const div = document.createElement('div');
		div.classList.add('modal', 'fade');
		div.innerHTML = `
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<p>test</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>`;
		return div;
	}

	_triggerEvents() {
		this._modalEl.addEventListener('shown.bs.modal', () => {
			this._isTransitioning = false;
		});
	}

	// Static

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
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	const target = getElementFromSelector(this);

	if (['A', 'AREA'].includes(this.tagName)) {
		event.preventDefault();
	}

	EventHandler.one(target, EVENT_SHOW, (showEvent) => {
		if (showEvent.defaultPrevented) {
			// only register focus restorer if lightbox will actually get shown
			return;
		}

		EventHandler.one(target, EVENT_HIDDEN, () => {
			if (isVisible(this)) {
				this.focus();
			}
		});
	});

	// avoid conflict when clicking moddal toggler while another one is open
	const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
	if (allReadyOpen) {
		Lightbox.getInstance(allReadyOpen).hide();
	}

	const data = Lightbox.getOrCreateInstance(target);

	data.toggle(this);
});

enableDismissTrigger(Lightbox);

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Lightbox to jQuery only if jQuery is present
 */

defineJQueryPlugin(Lightbox);

export default Lightbox;

// document.querySelectorAll('a').forEach(el => el.addEventListener('click', e => e.preventDefault()))
