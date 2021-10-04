(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bs5-lightbox", [], factory);
	else if(typeof exports === 'object')
		exports["bs5-lightbox"] = factory();
	else
		root["bs5-lightbox"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.esm.ts":
/*!**************************!*\
  !*** ./src/index.esm.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bootstrap_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap/modal */ "./src/bootstrap/modal.js");
/* harmony import */ var _bootstrap_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bootstrap/carousel */ "./src/bootstrap/carousel.js");
/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */


const bootstrap = {
    Modal: _bootstrap_modal__WEBPACK_IMPORTED_MODULE_0__["default"],
    Carousel: _bootstrap_carousel__WEBPACK_IMPORTED_MODULE_1__["default"]
};
class Lightbox {
    constructor(el, options = {}) {
        this.hash = this.randomHash();
        this.settings = Object.assign(Object.assign(Object.assign({}, bootstrap.Modal.Default), bootstrap.Carousel.Default), { interval: false, target: '[data-toggle="lightbox"]', gallery: '' });
        this.modalOptions = (() => this.setOptionsFromSettings(bootstrap.Modal.Default))();
        this.carouselOptions = (() => this.setOptionsFromSettings(bootstrap.Carousel.Default))();
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
        const gallery = galleryTarget ? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`), (v) => `${v.dataset.type ? 'embed' : ''}${this.getSrc(v)}`))] : [this.src];
        return gallery;
    }
    getYoutubeId(src) {
        if (!src)
            return false;
        let matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        return (matches && matches[2].length === 11) ? matches[2] : false;
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
        const slidesHtml = this.sources.map((src, i) => {
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
        }).join('');
        const controlsHtml = this.sources.length < 2 ? '' : `
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
        this.modalElement.addEventListener('hidden.bs.modal', (e) => this.modalElement.remove());
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
/* harmony default export */ __webpack_exports__["default"] = (Lightbox);


/***/ }),

/***/ "./src/bootstrap/carousel.js":
/*!***********************************!*\
  !*** ./src/bootstrap/carousel.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/js/src/util/index */ "../node_modules/bootstrap/js/src/util/index.js");
/* harmony import */ var bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/dom/event-handler */ "../node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var bootstrap_js_src_dom_manipulator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/src/dom/manipulator */ "../node_modules/bootstrap/js/src/dom/manipulator.js");
/* harmony import */ var bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/src/dom/selector-engine */ "../node_modules/bootstrap/js/src/dom/selector-engine.js");
/* harmony import */ var bootstrap_js_src_base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/src/base-component */ "../node_modules/bootstrap/js/src/base-component.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */







/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'carousel'
const DATA_KEY = 'bs.carousel'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_RIGHT_KEY = 'ArrowRight'
const TOUCHEVENT_COMPAT_WAIT = 500 // Time for mouse compat events to fire after touch
const SWIPE_THRESHOLD = 40

const Default = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
}

const DefaultType = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
}

const ORDER_NEXT = 'next'
const ORDER_PREV = 'prev'
const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
}

const EVENT_SLIDE = `slide${EVENT_KEY}`
const EVENT_SLID = `slid${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`
const EVENT_TOUCHEND = `touchend${EVENT_KEY}`
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`
const EVENT_POINTERUP = `pointerup${EVENT_KEY}`
const EVENT_DRAG_START = `dragstart${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_CAROUSEL = 'carousel'
const CLASS_NAME_ACTIVE = 'active'
const CLASS_NAME_SLIDE = 'slide'
const CLASS_NAME_END = 'carousel-item-end'
const CLASS_NAME_START = 'carousel-item-start'
const CLASS_NAME_NEXT = 'carousel-item-next'
const CLASS_NAME_PREV = 'carousel-item-prev'
const CLASS_NAME_POINTER_EVENT = 'pointer-event'

const SELECTOR_ACTIVE = '.active'
const SELECTOR_ACTIVE_ITEM = '.active.carousel-item'
const SELECTOR_ITEM = '.carousel-item'
const SELECTOR_ITEM_IMG = '.carousel-item img'
const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev'
const SELECTOR_INDICATORS = '.carousel-indicators'
const SELECTOR_INDICATOR = '[data-bs-target]'
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]'
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]'

const POINTER_TYPE_TOUCH = 'touch'
const POINTER_TYPE_PEN = 'pen'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class Carousel extends bootstrap_js_src_base_component__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(element, config) {
    super(element)

    this._items = null
    this._interval = null
    this._activeElement = null
    this._isPaused = false
    this._isSliding = false
    this.touchTimeout = null
    this.touchStartX = 0
    this.touchDeltaX = 0

    this._config = this._getConfig(config)
    this._indicatorsElement = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_INDICATORS, this._element)
    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
    this._pointerEvent = Boolean(window.PointerEvent)

    this._addEventListeners()
  }

  // Getters

  static get Default() {
    return Default
  }

  static get NAME() {
    return NAME
  }

  // Public

  next() {
    this._slide(ORDER_NEXT)
  }

  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isVisible)(this._element)) {
      this.next()
    }
  }

  prev() {
    this._slide(ORDER_PREV)
  }

  pause(event) {
    if (!event) {
      this._isPaused = true
    }

    if (bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_NEXT_PREV, this._element)) {
      (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.triggerTransitionEnd)(this._element)
      this.cycle(true)
    }

    clearInterval(this._interval)
    this._interval = null
  }

  cycle(event) {
    if (!event) {
      this._isPaused = false
    }

    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }

    if (this._config && this._config.interval && !this._isPaused) {
      this._updateInterval()

      this._interval = setInterval(
        (document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
        this._config.interval
      )
    }
  }

  to(index) {
    this._activeElement = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE_ITEM, this._element)
    const activeIndex = this._getItemIndex(this._activeElement)

    if (index > this._items.length - 1 || index < 0) {
      return
    }

    if (this._isSliding) {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].one(this._element, EVENT_SLID, () => this.to(index))
      return
    }

    if (activeIndex === index) {
      this.pause()
      this.cycle()
      return
    }

    const order = index > activeIndex ?
      ORDER_NEXT :
      ORDER_PREV

    this._slide(order, this._items[index])
  }

  // Private

  _getConfig(config) {
    config = {
      ...Default,
      ...bootstrap_js_src_dom_manipulator__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    }
    ;(0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.typeCheckConfig)(NAME, config, DefaultType)
    return config
  }

  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX)

    if (absDeltax <= SWIPE_THRESHOLD) {
      return
    }

    const direction = absDeltax / this.touchDeltaX

    this.touchDeltaX = 0

    if (!direction) {
      return
    }

    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT)
  }

  _addEventListeners() {
    if (this._config.keyboard) {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_KEYDOWN, event => this._keydown(event))
    }

    if (this._config.pause === 'hover') {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_MOUSEENTER, event => this.pause(event))
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event))
    }

    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners()
    }
  }

  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach(propertyName => {
      this[propertyName] = null;
    });
  }

  _addTouchEventListeners() {
    const hasPointerPenTouch = event => {
      return this._pointerEvent &&
        (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)
    }

    const start = event => {
      if (hasPointerPenTouch(event)) {
        this.touchStartX = event.clientX
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX
      }
    }

    const move = event => {
      // ensure swiping with one touch and not pinching
      this.touchDeltaX = event.touches && event.touches.length > 1 ?
        0 :
        event.touches[0].clientX - this.touchStartX
    }

    const end = event => {
      if (hasPointerPenTouch(event)) {
        this.touchDeltaX = event.clientX - this.touchStartX
      }

      this._handleSwipe()
      if (this._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause()
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout)
        }

        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval)
      }
    }

    bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(itemImg, EVENT_DRAG_START, e => e.preventDefault())
    })

    if (this._pointerEvent) {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_POINTERDOWN, event => start(event))
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_POINTERUP, event => end(event))

      this._element.classList.add(CLASS_NAME_POINTER_EVENT)
    } else {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_TOUCHSTART, event => start(event))
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_TOUCHMOVE, event => move(event))
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_TOUCHEND, event => end(event))
    }
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return
    }

    const direction = KEY_TO_DIRECTION[event.key]
    if (direction) {
      event.preventDefault()
      this._slide(direction)
    }
  }

  _getItemIndex(element) {
    this._items = element && element.parentNode ?
      bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].find(SELECTOR_ITEM, element.parentNode) :
      []

    return this._items.indexOf(element)
  }

  _getItemByOrder(order, activeElement) {
    const isNext = order === ORDER_NEXT
    return (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.getNextActiveElement)(this._items, activeElement, isNext, this._config.wrap)
  }

  _triggerSlideEvent(relatedTarget, eventDirectionName) {
    const targetIndex = this._getItemIndex(relatedTarget)
    const fromIndex = this._getItemIndex(bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE_ITEM, this._element))

    return bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    })
  }

  _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      const activeIndicator = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE, this._indicatorsElement)

      activeIndicator.classList.remove(CLASS_NAME_ACTIVE)
      activeIndicator.removeAttribute('aria-current')

      const indicators = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].find(SELECTOR_INDICATOR, this._indicatorsElement)

      for (let i = 0; i < indicators.length; i++) {
        if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
          indicators[i].classList.add(CLASS_NAME_ACTIVE)
          indicators[i].setAttribute('aria-current', 'true')
          break
        }
      }
    }
  }

  _updateInterval() {
    const element = this._activeElement || bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE_ITEM, this._element)

    if (!element) {
      return
    }

    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10)

    if (elementInterval) {
      this._config.defaultInterval = this._config.defaultInterval || this._config.interval
      this._config.interval = elementInterval
    } else {
      this._config.interval = this._config.defaultInterval || this._config.interval
    }
  }

  _slide(directionOrOrder, element) {
    const order = this._directionToOrder(directionOrOrder)
    const activeElement = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_ACTIVE_ITEM, this._element)
    const activeElementIndex = this._getItemIndex(activeElement)
    const nextElement = element || this._getItemByOrder(order, activeElement)

    const nextElementIndex = this._getItemIndex(nextElement)
    const isCycling = Boolean(this._interval)

    const isNext = order === ORDER_NEXT
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV
    const eventDirectionName = this._orderToDirection(order)

    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
      this._isSliding = false
      return
    }

    if (this._isSliding) {
      return
    }

    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName)
    if (slideEvent.defaultPrevented) {
      return
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return
    }

    this._isSliding = true

    if (isCycling) {
      this.pause()
    }

    this._setActiveIndicatorElement(nextElement)
    this._activeElement = nextElement

    const triggerSlidEvent = () => {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      })
    }

    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName)

      ;(0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.reflow)(nextElement)

      activeElement.classList.add(directionalClassName)
      nextElement.classList.add(directionalClassName)

      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName)
        nextElement.classList.add(CLASS_NAME_ACTIVE)

        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName)

        this._isSliding = false

        setTimeout(triggerSlidEvent, 0)
      }

      this._queueCallback(completeCallBack, activeElement, true)
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE)
      nextElement.classList.add(CLASS_NAME_ACTIVE)

      this._isSliding = false
      triggerSlidEvent()
    }

    if (isCycling) {
      this.cycle()
    }
  }

  _directionToOrder(direction) {
    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
      return direction
    }

    if ((0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isRTL)()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV
  }

  _orderToDirection(order) {
    if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
      return order
    }

    if ((0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isRTL)()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT
  }

  // Static

  static carouselInterface(element, config) {
    const data = Carousel.getOrCreateInstance(element, config)

    let { _config } = data
    if (typeof config === 'object') {
      _config = {
        ..._config,
        ...config
      }
    }

    const action = typeof config === 'string' ? config : _config.slide

    if (typeof config === 'number') {
      data.to(config)
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError(`No method named "${action}"`)
      }

      data[action]()
    } else if (_config.interval && _config.ride) {
      data.pause()
      data.cycle()
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Carousel.carouselInterface(this, config)
    })
  }

  static dataApiClickHandler(event) {
    let target = (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.getElementFromSelector)(this)

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return
    }
	
    const config = {
		...bootstrap_js_src_dom_manipulator__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAttributes(target),
		...bootstrap_js_src_dom_manipulator__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAttributes(this)
    }
	console.log(config)
    const slideIndex = this.getAttribute('data-bs-slide-to')

    if (slideIndex) {
      config.interval = false
    }

    Carousel.carouselInterface(target, config)

    if (slideIndex) {
      Carousel.getInstance(target).to(slideIndex)
    }

    event.preventDefault()
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Carousel);


/***/ }),

/***/ "./src/bootstrap/modal.js":
/*!********************************!*\
  !*** ./src/bootstrap/modal.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/js/src/util/index */ "../node_modules/bootstrap/js/src/util/index.js");
/* harmony import */ var bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/dom/event-handler */ "../node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var bootstrap_js_src_dom_manipulator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/src/dom/manipulator */ "../node_modules/bootstrap/js/src/dom/manipulator.js");
/* harmony import */ var bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/src/dom/selector-engine */ "../node_modules/bootstrap/js/src/dom/selector-engine.js");
/* harmony import */ var bootstrap_js_src_util_scrollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/src/util/scrollbar */ "../node_modules/bootstrap/js/src/util/scrollbar.js");
/* harmony import */ var bootstrap_js_src_base_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/js/src/base-component */ "../node_modules/bootstrap/js/src/base-component.js");
/* harmony import */ var bootstrap_js_src_util_backdrop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap/js/src/util/backdrop */ "../node_modules/bootstrap/js/src/util/backdrop.js");
/* harmony import */ var bootstrap_js_src_util_focustrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap/js/src/util/focustrap */ "../node_modules/bootstrap/js/src/util/focustrap.js");
/* harmony import */ var bootstrap_js_src_util_component_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap/js/src/util/component-functions */ "../node_modules/bootstrap/js/src/util/component-functions.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */











/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'modal'
const DATA_KEY = 'bs.modal'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const ESCAPE_KEY = 'Escape'

const Default = {
  backdrop: true,
  keyboard: true,
  focus: true
}

const DefaultType = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean'
}

const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_OPEN = 'modal-open'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_STATIC = 'modal-static'

const OPEN_SELECTOR = '.modal.show'
const SELECTOR_DIALOG = '.modal-dialog'
const SELECTOR_MODAL_BODY = '.modal-body'
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Modal extends bootstrap_js_src_base_component__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor(element, config) {
    super(element)

    this._config = this._getConfig(config)
    this._dialog = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_DIALOG, this._element)
    this._backdrop = this._initializeBackDrop()
    this._focustrap = this._initializeFocusTrap()
    this._isShown = false
    this._ignoreBackdropClick = false
    this._isTransitioning = false
    this._scrollBar = new bootstrap_js_src_util_scrollbar__WEBPACK_IMPORTED_MODULE_4__["default"]()
  }

  // Getters

  static get Default() {
    return Default
  }

  static get NAME() {
    return NAME
  }

  // Public

  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget)
  }

  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return
    }

    const showEvent = bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_SHOW, {
      relatedTarget
    })

    if (showEvent.defaultPrevented) {
      return
    }

    this._isShown = true

    if (this._isAnimated()) {
      this._isTransitioning = true
    }

    this._scrollBar.hide()

    document.body.classList.add(CLASS_NAME_OPEN)

    this._adjustDialog()

    this._setEscapeEvent()
    this._setResizeEvent()

    bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].one(this._element, EVENT_MOUSEUP_DISMISS, event => {
        if (event.target === this._element) {
          this._ignoreBackdropClick = true
        }
      })
    })

    this._showBackdrop(() => this._showElement(relatedTarget))
  }

  hide() {
    if (!this._isShown || this._isTransitioning) {
      return
    }

    const hideEvent = bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_HIDE)

    if (hideEvent.defaultPrevented) {
      return
    }

    this._isShown = false
    const isAnimated = this._isAnimated()

    if (isAnimated) {
      this._isTransitioning = true
    }

    this._setEscapeEvent()
    this._setResizeEvent()

    this._focustrap.deactivate()

    this._element.classList.remove(CLASS_NAME_SHOW)

    bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, EVENT_CLICK_DISMISS)
    bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._dialog, EVENT_MOUSEDOWN_DISMISS)

    this._queueCallback(() => this._hideModal(), this._element, isAnimated)
  }

  dispose() {
    [window, this._dialog]
      .forEach(htmlElement => bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].off(htmlElement, EVENT_KEY))

    this._backdrop.dispose()
    this._focustrap.deactivate()
    super.dispose()
  }

  handleUpdate() {
    this._adjustDialog()
  }

  // Private

  _initializeBackDrop() {
    return new bootstrap_js_src_util_backdrop__WEBPACK_IMPORTED_MODULE_6__["default"]({
      isVisible: Boolean(this._config.backdrop), // 'static' option will be translated to true, and booleans will keep their value
      isAnimated: this._isAnimated()
    })
  }

  _initializeFocusTrap() {
    return new bootstrap_js_src_util_focustrap__WEBPACK_IMPORTED_MODULE_7__["default"]({
      trapElement: this._element
    })
  }

  _getConfig(config) {
    config = {
      ...Default,
      ...bootstrap_js_src_dom_manipulator__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    }
    ;(0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.typeCheckConfig)(NAME, config, DefaultType)
    return config
  }

  _showElement(relatedTarget) {
    const isAnimated = this._isAnimated()
    const modalBody = bootstrap_js_src_dom_selector_engine__WEBPACK_IMPORTED_MODULE_3__["default"].findOne(SELECTOR_MODAL_BODY, this._dialog)

    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.append(this._element)
    }

    this._element.style.display = 'block'
    this._element.removeAttribute('aria-hidden')
    this._element.setAttribute('aria-modal', true)
    this._element.setAttribute('role', 'dialog')
    this._element.scrollTop = 0

    if (modalBody) {
      modalBody.scrollTop = 0
    }

    if (isAnimated) {
      (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.reflow)(this._element)
    }

    this._element.classList.add(CLASS_NAME_SHOW)

    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate()
      }

      this._isTransitioning = false
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_SHOWN, {
        relatedTarget
      })
    }

    this._queueCallback(transitionComplete, this._dialog, isAnimated)
  }

  _setEscapeEvent() {
    if (this._isShown) {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (this._config.keyboard && event.key === ESCAPE_KEY) {
          event.preventDefault()
          this.hide()
        } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
          this._triggerBackdropTransition()
        }
      })
    } else {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, EVENT_KEYDOWN_DISMISS)
    }
  }

  _setResizeEvent() {
    if (this._isShown) {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(window, EVENT_RESIZE, () => this._adjustDialog())
    } else {
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].off(window, EVENT_RESIZE)
    }
  }

  _hideModal() {
    this._element.style.display = 'none'
    this._element.setAttribute('aria-hidden', true)
    this._element.removeAttribute('aria-modal')
    this._element.removeAttribute('role')
    this._isTransitioning = false
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN)
      this._resetAdjustments()
      this._scrollBar.reset()
      bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_HIDDEN)
    })
  }

  _showBackdrop(callback) {
    bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, EVENT_CLICK_DISMISS, event => {
      if (this._ignoreBackdropClick) {
        this._ignoreBackdropClick = false
        return
      }

      if (event.target !== event.currentTarget) {
        return
      }

      if (this._config.backdrop === true) {
        this.hide()
      } else if (this._config.backdrop === 'static') {
        this._triggerBackdropTransition()
      }
    })

    this._backdrop.show(callback)
  }

  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE)
  }

  _triggerBackdropTransition() {
    const hideEvent = bootstrap_js_src_dom_event_handler__WEBPACK_IMPORTED_MODULE_1__["default"].trigger(this._element, EVENT_HIDE_PREVENTED)
    if (hideEvent.defaultPrevented) {
      return
    }

    const { classList, scrollHeight, style } = this._element
    const isModalOverflowing = scrollHeight > document.documentElement.clientHeight

    // return if the following background transition hasn't yet completed
    if ((!isModalOverflowing && style.overflowY === 'hidden') || classList.contains(CLASS_NAME_STATIC)) {
      return
    }

    if (!isModalOverflowing) {
      style.overflowY = 'hidden'
    }

    classList.add(CLASS_NAME_STATIC)
    this._queueCallback(() => {
      classList.remove(CLASS_NAME_STATIC)
      if (!isModalOverflowing) {
        this._queueCallback(() => {
          style.overflowY = ''
        }, this._dialog)
      }
    }, this._dialog)

    this._element.focus()
  }

  // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // ----------------------------------------------------------------------

  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight
    const scrollbarWidth = this._scrollBar.getWidth()
    const isBodyOverflowing = scrollbarWidth > 0

    if ((!isBodyOverflowing && isModalOverflowing && !(0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isRTL)()) || (isBodyOverflowing && !isModalOverflowing && (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isRTL)())) {
      this._element.style.paddingLeft = `${scrollbarWidth}px`
    }

    if ((isBodyOverflowing && !isModalOverflowing && !(0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isRTL)()) || (!isBodyOverflowing && isModalOverflowing && (0,bootstrap_js_src_util_index__WEBPACK_IMPORTED_MODULE_0__.isRTL)())) {
      this._element.style.paddingRight = `${scrollbarWidth}px`
    }
  }

  _resetAdjustments() {
    this._element.style.paddingLeft = ''
    this._element.style.paddingRight = ''
  }

  // Static

  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Modal.getOrCreateInstance(this, config)

      if (typeof config !== 'string') {
        return
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config](relatedTarget)
    })
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Modal);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/base-component.js":
/*!**********************************************************!*\
  !*** ../node_modules/bootstrap/js/src/base-component.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/data */ "../node_modules/bootstrap/js/src/dom/data.js");
/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/index */ "../node_modules/bootstrap/js/src/util/index.js");
/* harmony import */ var _dom_event_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/event-handler */ "../node_modules/bootstrap/js/src/dom/event-handler.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */





/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const VERSION = '5.1.1'

class BaseComponent {
  constructor(element) {
    element = (0,_util_index__WEBPACK_IMPORTED_MODULE_1__.getElement)(element)

    if (!element) {
      return
    }

    this._element = element
    _dom_data__WEBPACK_IMPORTED_MODULE_0__["default"].set(this._element, this.constructor.DATA_KEY, this)
  }

  dispose() {
    _dom_data__WEBPACK_IMPORTED_MODULE_0__["default"].remove(this._element, this.constructor.DATA_KEY)
    _dom_event_handler__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._element, this.constructor.EVENT_KEY)

    Object.getOwnPropertyNames(this).forEach(propertyName => {
      this[propertyName] = null
    })
  }

  _queueCallback(callback, element, isAnimated = true) {
    (0,_util_index__WEBPACK_IMPORTED_MODULE_1__.executeAfterTransition)(callback, element, isAnimated)
  }

  /** Static */

  static getInstance(element) {
    return _dom_data__WEBPACK_IMPORTED_MODULE_0__["default"].get((0,_util_index__WEBPACK_IMPORTED_MODULE_1__.getElement)(element), this.DATA_KEY)
  }

  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
  }

  static get VERSION() {
    return VERSION
  }

  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!')
  }

  static get DATA_KEY() {
    return `bs.${this.NAME}`
  }

  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BaseComponent);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/dom/data.js":
/*!****************************************************!*\
  !*** ../node_modules/bootstrap/js/src/dom/data.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const elementMap = new Map()

/* harmony default export */ __webpack_exports__["default"] = ({
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map())
    }

    const instanceMap = elementMap.get(element)

    // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`)
      return
    }

    instanceMap.set(key, instance)
  },

  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null
    }

    return null
  },

  remove(element, key) {
    if (!elementMap.has(element)) {
      return
    }

    const instanceMap = elementMap.get(element)

    instanceMap.delete(key)

    // free up element references if there are no instances left for an element
    if (instanceMap.size === 0) {
      elementMap.delete(element)
    }
  }
});


/***/ }),

/***/ "../node_modules/bootstrap/js/src/dom/event-handler.js":
/*!*************************************************************!*\
  !*** ../node_modules/bootstrap/js/src/dom/event-handler.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index */ "../node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */



/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/
const stripNameRegex = /\..*/
const stripUidRegex = /::\d+$/
const eventRegistry = {} // Events storage
let uidEvent = 1
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
}
const customEventsRegex = /^(mouseenter|mouseleave)/i
const nativeEvents = new Set([
  'click',
  'dblclick',
  'mouseup',
  'mousedown',
  'contextmenu',
  'mousewheel',
  'DOMMouseScroll',
  'mouseover',
  'mouseout',
  'mousemove',
  'selectstart',
  'selectend',
  'keydown',
  'keypress',
  'keyup',
  'orientationchange',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'pointercancel',
  'gesturestart',
  'gesturechange',
  'gestureend',
  'focus',
  'blur',
  'change',
  'reset',
  'select',
  'submit',
  'focusin',
  'focusout',
  'load',
  'unload',
  'beforeunload',
  'resize',
  'move',
  'DOMContentLoaded',
  'readystatechange',
  'error',
  'abort',
  'scroll'
])

/**
 * ------------------------------------------------------------------------
 * Private methods
 * ------------------------------------------------------------------------
 */

function getUidEvent(element, uid) {
  return (uid && `${uid}::${uidEvent++}`) || element.uidEvent || uidEvent++
}

function getEvent(element) {
  const uid = getUidEvent(element)

  element.uidEvent = uid
  eventRegistry[uid] = eventRegistry[uid] || {}

  return eventRegistry[uid]
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    event.delegateTarget = element

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn)
    }

    return fn.apply(element, [event])
  }
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector)

    for (let { target } = event; target && target !== this; target = target.parentNode) {
      for (let i = domElements.length; i--;) {
        if (domElements[i] === target) {
          event.delegateTarget = target

          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn)
          }

          return fn.apply(target, [event])
        }
      }
    }

    // To please ESLint
    return null
  }
}

function findHandler(events, handler, delegationSelector = null) {
  const uidEventList = Object.keys(events)

  for (let i = 0, len = uidEventList.length; i < len; i++) {
    const event = events[uidEventList[i]]

    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event
    }
  }

  return null
}

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === 'string'
  const originalHandler = delegation ? delegationFn : handler

  let typeEvent = getTypeEvent(originalTypeEvent)
  const isNative = nativeEvents.has(typeEvent)

  if (!isNative) {
    typeEvent = originalTypeEvent
  }

  return [delegation, originalHandler, typeEvent]
}

function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return
  }

  if (!handler) {
    handler = delegationFn
    delegationFn = null
  }

  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
  if (customEventsRegex.test(originalTypeEvent)) {
    const wrapFn = fn => {
      return function (event) {
        if (!event.relatedTarget || (event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget))) {
          return fn.call(this, event)
        }
      }
    }

    if (delegationFn) {
      delegationFn = wrapFn(delegationFn)
    } else {
      handler = wrapFn(handler)
    }
  }

  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn)
  const events = getEvent(element)
  const handlers = events[typeEvent] || (events[typeEvent] = {})
  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null)

  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff

    return
  }

  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''))
  const fn = delegation ?
    bootstrapDelegationHandler(element, handler, delegationFn) :
    bootstrapHandler(element, handler)

  fn.delegationSelector = delegation ? handler : null
  fn.originalHandler = originalHandler
  fn.oneOff = oneOff
  fn.uidEvent = uid
  handlers[uid] = fn

  element.addEventListener(typeEvent, fn, delegation)
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector)

  if (!fn) {
    return
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector))
  delete events[typeEvent][fn.uidEvent]
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {}

  Object.keys(storeElementEvent).forEach(handlerKey => {
    if (handlerKey.includes(namespace)) {
      const event = storeElementEvent[handlerKey]

      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector)
    }
  })
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '')
  return customEvents[event] || event
}

const EventHandler = {
  on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false)
  },

  one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true)
  },

  off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn)
    const inNamespace = typeEvent !== originalTypeEvent
    const events = getEvent(element)
    const isNamespace = originalTypeEvent.startsWith('.')

    if (typeof originalHandler !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!events || !events[typeEvent]) {
        return
      }

      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null)
      return
    }

    if (isNamespace) {
      Object.keys(events).forEach(elementEvent => {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1))
      })
    }

    const storeElementEvent = events[typeEvent] || {}
    Object.keys(storeElementEvent).forEach(keyHandlers => {
      const handlerKey = keyHandlers.replace(stripUidRegex, '')

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        const event = storeElementEvent[keyHandlers]

        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector)
      }
    })
  },

  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null
    }

    const $ = (0,_util_index__WEBPACK_IMPORTED_MODULE_0__.getjQuery)()
    const typeEvent = getTypeEvent(event)
    const inNamespace = event !== typeEvent
    const isNative = nativeEvents.has(typeEvent)

    let jQueryEvent
    let bubbles = true
    let nativeDispatch = true
    let defaultPrevented = false
    let evt = null

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args)

      $(element).trigger(jQueryEvent)
      bubbles = !jQueryEvent.isPropagationStopped()
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped()
      defaultPrevented = jQueryEvent.isDefaultPrevented()
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents')
      evt.initEvent(typeEvent, bubbles, true)
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      })
    }

    // merge custom information in our event
    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(key => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key]
          }
        })
      })
    }

    if (defaultPrevented) {
      evt.preventDefault()
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt)
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault()
    }

    return evt
  }
}

/* harmony default export */ __webpack_exports__["default"] = (EventHandler);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/dom/manipulator.js":
/*!***********************************************************!*\
  !*** ../node_modules/bootstrap/js/src/dom/manipulator.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(val) {
  if (val === 'true') {
    return true
  }

  if (val === 'false') {
    return false
  }

  if (val === Number(val).toString()) {
    return Number(val)
  }

  if (val === '' || val === 'null') {
    return null
  }

  return val
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value)
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`)
  },

  getDataAttributes(element) {
    if (!element) {
      return {}
    }

    const attributes = {}

    Object.keys(element.dataset)
      .filter(key => key.startsWith('bs'))
      .forEach(key => {
        let pureKey = key.replace(/^bs/, '')
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length)
        attributes[pureKey] = normalizeData(element.dataset[key])
      })

    return attributes
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`))
  },

  offset(element) {
    const rect = element.getBoundingClientRect()

    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    }
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Manipulator);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/dom/selector-engine.js":
/*!***************************************************************!*\
  !*** ../node_modules/bootstrap/js/src/dom/selector-engine.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/index */ "../node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */



const NODE_TEXT = 3

const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector))
  },

  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector)
  },

  children(element, selector) {
    return [].concat(...element.children)
      .filter(child => child.matches(selector))
  },

  parents(element, selector) {
    const parents = []

    let ancestor = element.parentNode

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor)
      }

      ancestor = ancestor.parentNode
    }

    return parents
  },

  prev(element, selector) {
    let previous = element.previousElementSibling

    while (previous) {
      if (previous.matches(selector)) {
        return [previous]
      }

      previous = previous.previousElementSibling
    }

    return []
  },

  next(element, selector) {
    let next = element.nextElementSibling

    while (next) {
      if (next.matches(selector)) {
        return [next]
      }

      next = next.nextElementSibling
    }

    return []
  },

  focusableChildren(element) {
    const focusables = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'details',
      '[tabindex]',
      '[contenteditable="true"]'
    ].map(selector => `${selector}:not([tabindex^="-"])`).join(', ')

    return this.find(focusables, element).filter(el => !(0,_util_index__WEBPACK_IMPORTED_MODULE_0__.isDisabled)(el) && (0,_util_index__WEBPACK_IMPORTED_MODULE_0__.isVisible)(el))
  }
}

/* harmony default export */ __webpack_exports__["default"] = (SelectorEngine);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/util/backdrop.js":
/*!*********************************************************!*\
  !*** ../node_modules/bootstrap/js/src/util/backdrop.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/event-handler */ "../node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "../node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




const Default = {
  className: 'modal-backdrop',
  isVisible: true, // if false, we use the backdrop helper without adding any element to the dom
  isAnimated: false,
  rootElement: 'body', // give the choice to place backdrop under different elements
  clickCallback: null
}

const DefaultType = {
  className: 'string',
  isVisible: 'boolean',
  isAnimated: 'boolean',
  rootElement: '(element|string)',
  clickCallback: '(function|null)'
}
const NAME = 'backdrop'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'

const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`

class Backdrop {
  constructor(config) {
    this._config = this._getConfig(config)
    this._isAppended = false
    this._element = null
  }

  show(callback) {
    if (!this._config.isVisible) {
      (0,_index__WEBPACK_IMPORTED_MODULE_1__.execute)(callback)
      return
    }

    this._append()

    if (this._config.isAnimated) {
      (0,_index__WEBPACK_IMPORTED_MODULE_1__.reflow)(this._getElement())
    }

    this._getElement().classList.add(CLASS_NAME_SHOW)

    this._emulateAnimation(() => {
      ;(0,_index__WEBPACK_IMPORTED_MODULE_1__.execute)(callback)
    })
  }

  hide(callback) {
    if (!this._config.isVisible) {
      (0,_index__WEBPACK_IMPORTED_MODULE_1__.execute)(callback)
      return
    }

    this._getElement().classList.remove(CLASS_NAME_SHOW)

    this._emulateAnimation(() => {
      this.dispose()
      ;(0,_index__WEBPACK_IMPORTED_MODULE_1__.execute)(callback)
    })
  }

  // Private

  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div')
      backdrop.className = this._config.className
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE)
      }

      this._element = backdrop
    }

    return this._element
  }

  _getConfig(config) {
    config = {
      ...Default,
      ...(typeof config === 'object' ? config : {})
    }

    // use getElement() with the default "body" to get a fresh Element on each instantiation
    config.rootElement = (0,_index__WEBPACK_IMPORTED_MODULE_1__.getElement)(config.rootElement)
    ;(0,_index__WEBPACK_IMPORTED_MODULE_1__.typeCheckConfig)(NAME, config, DefaultType)
    return config
  }

  _append() {
    if (this._isAppended) {
      return
    }

    this._config.rootElement.append(this._getElement())

    _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._getElement(), EVENT_MOUSEDOWN, () => {
      ;(0,_index__WEBPACK_IMPORTED_MODULE_1__.execute)(this._config.clickCallback)
    })

    this._isAppended = true
  }

  dispose() {
    if (!this._isAppended) {
      return
    }

    _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].off(this._element, EVENT_MOUSEDOWN)

    this._element.remove()
    this._isAppended = false
  }

  _emulateAnimation(callback) {
    (0,_index__WEBPACK_IMPORTED_MODULE_1__.executeAfterTransition)(callback, this._getElement(), this._config.isAnimated)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Backdrop);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/util/component-functions.js":
/*!********************************************************************!*\
  !*** ../node_modules/bootstrap/js/src/util/component-functions.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enableDismissTrigger": function() { return /* binding */ enableDismissTrigger; }
/* harmony export */ });
/* harmony import */ var _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/event-handler */ "../node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "../node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */




const enableDismissTrigger = (component, method = 'hide') => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`
  const name = component.NAME

  _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault()
    }

    if ((0,_index__WEBPACK_IMPORTED_MODULE_1__.isDisabled)(this)) {
      return
    }

    const target = (0,_index__WEBPACK_IMPORTED_MODULE_1__.getElementFromSelector)(this) || this.closest(`.${name}`)
    const instance = component.getOrCreateInstance(target)

    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
    instance[method]()
  })
}




/***/ }),

/***/ "../node_modules/bootstrap/js/src/util/focustrap.js":
/*!**********************************************************!*\
  !*** ../node_modules/bootstrap/js/src/util/focustrap.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/event-handler */ "../node_modules/bootstrap/js/src/dom/event-handler.js");
/* harmony import */ var _dom_selector_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/selector-engine */ "../node_modules/bootstrap/js/src/dom/selector-engine.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "../node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */





const Default = {
  trapElement: null, // The element to trap focus inside of
  autofocus: true
}

const DefaultType = {
  trapElement: 'element',
  autofocus: 'boolean'
}

const NAME = 'focustrap'
const DATA_KEY = 'bs.focustrap'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`

const TAB_KEY = 'Tab'
const TAB_NAV_FORWARD = 'forward'
const TAB_NAV_BACKWARD = 'backward'

class FocusTrap {
  constructor(config) {
    this._config = this._getConfig(config)
    this._isActive = false
    this._lastTabNavDirection = null
  }

  activate() {
    const { trapElement, autofocus } = this._config

    if (this._isActive) {
      return
    }

    if (autofocus) {
      trapElement.focus()
    }

    _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].off(document, EVENT_KEY) // guard against infinite focus loop
    _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].on(document, EVENT_FOCUSIN, event => this._handleFocusin(event))
    _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event))

    this._isActive = true
  }

  deactivate() {
    if (!this._isActive) {
      return
    }

    this._isActive = false
    _dom_event_handler__WEBPACK_IMPORTED_MODULE_0__["default"].off(document, EVENT_KEY)
  }

  // Private

  _handleFocusin(event) {
    const { target } = event
    const { trapElement } = this._config

    if (
      target === document ||
      target === trapElement ||
      trapElement.contains(target)
    ) {
      return
    }

    const elements = _dom_selector_engine__WEBPACK_IMPORTED_MODULE_1__["default"].focusableChildren(trapElement)

    if (elements.length === 0) {
      trapElement.focus()
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus()
    } else {
      elements[0].focus()
    }
  }

  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return
    }

    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD
  }

  _getConfig(config) {
    config = {
      ...Default,
      ...(typeof config === 'object' ? config : {})
    }
    ;(0,_index__WEBPACK_IMPORTED_MODULE_2__.typeCheckConfig)(NAME, config, DefaultType)
    return config
  }
}

/* harmony default export */ __webpack_exports__["default"] = (FocusTrap);


/***/ }),

/***/ "../node_modules/bootstrap/js/src/util/index.js":
/*!******************************************************!*\
  !*** ../node_modules/bootstrap/js/src/util/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getElement": function() { return /* binding */ getElement; },
/* harmony export */   "getUID": function() { return /* binding */ getUID; },
/* harmony export */   "getSelectorFromElement": function() { return /* binding */ getSelectorFromElement; },
/* harmony export */   "getElementFromSelector": function() { return /* binding */ getElementFromSelector; },
/* harmony export */   "getTransitionDurationFromElement": function() { return /* binding */ getTransitionDurationFromElement; },
/* harmony export */   "triggerTransitionEnd": function() { return /* binding */ triggerTransitionEnd; },
/* harmony export */   "isElement": function() { return /* binding */ isElement; },
/* harmony export */   "typeCheckConfig": function() { return /* binding */ typeCheckConfig; },
/* harmony export */   "isVisible": function() { return /* binding */ isVisible; },
/* harmony export */   "isDisabled": function() { return /* binding */ isDisabled; },
/* harmony export */   "findShadowRoot": function() { return /* binding */ findShadowRoot; },
/* harmony export */   "noop": function() { return /* binding */ noop; },
/* harmony export */   "getNextActiveElement": function() { return /* binding */ getNextActiveElement; },
/* harmony export */   "reflow": function() { return /* binding */ reflow; },
/* harmony export */   "getjQuery": function() { return /* binding */ getjQuery; },
/* harmony export */   "onDOMContentLoaded": function() { return /* binding */ onDOMContentLoaded; },
/* harmony export */   "isRTL": function() { return /* binding */ isRTL; },
/* harmony export */   "defineJQueryPlugin": function() { return /* binding */ defineJQueryPlugin; },
/* harmony export */   "execute": function() { return /* binding */ execute; },
/* harmony export */   "executeAfterTransition": function() { return /* binding */ executeAfterTransition; }
/* harmony export */ });
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MAX_UID = 1000000
const MILLISECONDS_MULTIPLIER = 1000
const TRANSITION_END = 'transitionend'

// Shoutout AngusCroll (https://goo.gl/pxwQGp)
const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
}

/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */

const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID)
  } while (document.getElementById(prefix))

  return prefix
}

const getSelector = element => {
  let selector = element.getAttribute('data-bs-target')

  if (!selector || selector === '#') {
    let hrefAttr = element.getAttribute('href')

    // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273
    if (!hrefAttr || (!hrefAttr.includes('#') && !hrefAttr.startsWith('.'))) {
      return null
    }

    // Just in case some CMS puts out a full URL with the anchor appended
    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
      hrefAttr = `#${hrefAttr.split('#')[1]}`
    }

    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null
  }

  return selector
}

const getSelectorFromElement = element => {
  const selector = getSelector(element)

  if (selector) {
    return document.querySelector(selector) ? selector : null
  }

  return null
}

const getElementFromSelector = element => {
  const selector = getSelector(element)

  return selector ? document.querySelector(selector) : null
}

const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0
  }

  // Get transition-duration of the element
  let { transitionDuration, transitionDelay } = window.getComputedStyle(element)

  const floatTransitionDuration = Number.parseFloat(transitionDuration)
  const floatTransitionDelay = Number.parseFloat(transitionDelay)

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0]
  transitionDelay = transitionDelay.split(',')[0]

  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
}

const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END))
}

const isElement = obj => {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  if (typeof obj.jquery !== 'undefined') {
    obj = obj[0]
  }

  return typeof obj.nodeType !== 'undefined'
}

const getElement = obj => {
  if (isElement(obj)) { // it's a jQuery object or a node element
    return obj.jquery ? obj[0] : obj
  }

  if (typeof obj === 'string' && obj.length > 0) {
    return document.querySelector(obj)
  }

  return null
}

const typeCheckConfig = (componentName, config, configTypes) => {
  Object.keys(configTypes).forEach(property => {
    const expectedTypes = configTypes[property]
    const value = config[property]
    const valueType = value && isElement(value) ? 'element' : toType(value)

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(
        `${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
      )
    }
  })
}

const isVisible = element => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false
  }

  return getComputedStyle(element).getPropertyValue('visibility') === 'visible'
}

const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true
  }

  if (element.classList.contains('disabled')) {
    return true
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
}

const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode()
    return root instanceof ShadowRoot ? root : null
  }

  if (element instanceof ShadowRoot) {
    return element
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null
  }

  return findShadowRoot(element.parentNode)
}

const noop = () => {}

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = element => {
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight
}

const getjQuery = () => {
  const { jQuery } = window

  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return jQuery
  }

  return null
}

const DOMContentLoadedCallbacks = []

const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        DOMContentLoadedCallbacks.forEach(callback => callback())
      })
    }

    DOMContentLoadedCallbacks.push(callback)
  } else {
    callback()
  }
}

const isRTL = () => document.documentElement.dir === 'rtl'

const defineJQueryPlugin = plugin => {
  onDOMContentLoaded(() => {
    const $ = getjQuery()
    /* istanbul ignore if */
    if ($) {
      const name = plugin.NAME
      const JQUERY_NO_CONFLICT = $.fn[name]
      $.fn[name] = plugin.jQueryInterface
      $.fn[name].Constructor = plugin
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT
        return plugin.jQueryInterface
      }
    }
  })
}

const execute = callback => {
  if (typeof callback === 'function') {
    callback()
  }
}

const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback)
    return
  }

  const durationPadding = 5
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding

  let called = false

  const handler = ({ target }) => {
    if (target !== transitionElement) {
      return
    }

    called = true
    transitionElement.removeEventListener(TRANSITION_END, handler)
    execute(callback)
  }

  transitionElement.addEventListener(TRANSITION_END, handler)
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement)
    }
  }, emulatedDuration)
}

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  let index = list.indexOf(activeElement)

  // if the element does not exist in the list return an element depending on the direction and if cycle is allowed
  if (index === -1) {
    return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0]
  }

  const listLength = list.length

  index += shouldGetNext ? 1 : -1

  if (isCycleAllowed) {
    index = (index + listLength) % listLength
  }

  return list[Math.max(0, Math.min(index, listLength - 1))]
}




/***/ }),

/***/ "../node_modules/bootstrap/js/src/util/scrollbar.js":
/*!**********************************************************!*\
  !*** ../node_modules/bootstrap/js/src/util/scrollbar.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_selector_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/selector-engine */ "../node_modules/bootstrap/js/src/dom/selector-engine.js");
/* harmony import */ var _dom_manipulator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/manipulator */ "../node_modules/bootstrap/js/src/dom/manipulator.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "../node_modules/bootstrap/js/src/util/index.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */





const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
const SELECTOR_STICKY_CONTENT = '.sticky-top'

class ScrollBarHelper {
  constructor() {
    this._element = document.body
  }

  getWidth() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - documentWidth)
  }

  hide() {
    const width = this.getWidth()
    this._disableOverFlow()
    // give padding to element to balance the hidden scrollbar width
    this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width)
    // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width)
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width)
  }

  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow')
    this._element.style.overflow = 'hidden'
  }

  _setElementAttributes(selector, styleProp, callback) {
    const scrollbarWidth = this.getWidth()
    const manipulationCallBack = element => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return
      }

      this._saveInitialAttribute(element, styleProp)
      const calculatedValue = window.getComputedStyle(element)[styleProp]
      element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`
    }

    this._applyManipulationCallback(selector, manipulationCallBack)
  }

  reset() {
    this._resetElementAttributes(this._element, 'overflow')
    this._resetElementAttributes(this._element, 'paddingRight')
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight')
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight')
  }

  _saveInitialAttribute(element, styleProp) {
    const actualValue = element.style[styleProp]
    if (actualValue) {
      _dom_manipulator__WEBPACK_IMPORTED_MODULE_1__["default"].setDataAttribute(element, styleProp, actualValue)
    }
  }

  _resetElementAttributes(selector, styleProp) {
    const manipulationCallBack = element => {
      const value = _dom_manipulator__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAttribute(element, styleProp)
      if (typeof value === 'undefined') {
        element.style.removeProperty(styleProp)
      } else {
        _dom_manipulator__WEBPACK_IMPORTED_MODULE_1__["default"].removeDataAttribute(element, styleProp)
        element.style[styleProp] = value
      }
    }

    this._applyManipulationCallback(selector, manipulationCallBack)
  }

  _applyManipulationCallback(selector, callBack) {
    if ((0,_index__WEBPACK_IMPORTED_MODULE_2__.isElement)(selector)) {
      callBack(selector)
    } else {
      _dom_selector_engine__WEBPACK_IMPORTED_MODULE_0__["default"].find(selector, this._element).forEach(callBack)
    }
  }

  isOverflowing() {
    return this.getWidth() > 0
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ScrollBarHelper);


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
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.esm */ "./src/index.esm.ts");
/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a new Lightbox instance.
 */

document.querySelectorAll(_index_esm__WEBPACK_IMPORTED_MODULE_0__["default"].defaultSelector).forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    const lightbox = new _index_esm__WEBPACK_IMPORTED_MODULE_0__["default"](el);
    lightbox.show();
}));
/* harmony default export */ __webpack_exports__["default"] = (_index_esm__WEBPACK_IMPORTED_MODULE_0__["default"]);

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map