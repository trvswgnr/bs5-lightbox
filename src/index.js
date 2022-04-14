import { defineJQueryPlugin, isVisible } from 'bootstrap/js/src/util/index'
import EventHandler from 'bootstrap/js/dist/dom/event-handler'
import SelectorEngine from 'bootstrap/js/dist/dom/selector-engine'
import { enableDismissTrigger } from 'bootstrap/js/src/util/component-functions'
import { Modal, Carousel } from 'bootstrap'
import { createModalEl, createCarouseEl, modalEventsHandler } from './util'

const NAME = 'lightbox'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const CLASS_NAME_OPEN = `${NAME}-open`
const OPEN_SELECTOR = `.${NAME}.show`
const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"]`
const BS_MODAL_EVENTS = ['show.bs.modal', 'shown.bs.modal', 'hide.bs.modal', 'hidden.bs.modal', 'hidePrevented.bs.modal']
const BS_CAROUSEL_EVENTS = ['slide.bs.carousel', 'slid.bs.carousel']

class Lightbox extends Modal {
  constructor(element, config) {
    const carouselEl = createCarouseEl()
    Carousel.getOrCreateInstance(carouselEl, {
      interval: false,
      ride: false
    })
    const modalEl = createModalEl(carouselEl)
    super(modalEl, config)
    this.carouselEl = carouselEl
    this.modalEl = modalEl
    this._setupEventListeners()
  }

  // Public

  // Private

  _setupEventListeners() {
    BS_MODAL_EVENTS.map(eventName => this._element.addEventListener(eventName, event => modalEventsHandler(this._element, event)))
    BS_CAROUSEL_EVENTS.map(eventName => this.carouselEl.addEventListener(eventName, event => modalEventsHandler(this._element, event)))

    this._element.addEventListener('hidden.bs.modal', () => {
      document.body.classList.remove(CLASS_NAME_OPEN)
      this._element.remove()
    })
  }

  // Static

  static get NAME() {
    return NAME
  }

  static get EVENT_CLICK_DATA_API() {
    return EVENT_CLICK_DATA_API
  }

  static initialize(event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault()
    }

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR)
    if (alreadyOpen) {
      Lightbox.getInstance(alreadyOpen).hide()
    }

    const data = Lightbox.getOrCreateInstance(this)

    const target = data.modalEl

    EventHandler.one(target, EVENT_SHOW, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return
      }

      EventHandler.one(target, EVENT_HIDDEN, () => {
        if (isVisible(this)) {
          this.focus()
        }
      })
    })

    data.toggle(this)
  }

  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Lightbox.getOrCreateInstance(this, config)

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

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, Lightbox.initialize)

enableDismissTrigger(Lightbox)

// EventHandler.off(document, Lightbox.EVENT_CLICK_DATA_API);

/**
 * jQuery
 */

defineJQueryPlugin(Lightbox)

export default Lightbox
