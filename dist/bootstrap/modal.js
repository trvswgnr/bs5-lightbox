/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("bootstrap/js/src/util/index");
const event_handler_1 = __importDefault(require("bootstrap/js/src/dom/event-handler"));
const manipulator_1 = __importDefault(require("bootstrap/js/src/dom/manipulator"));
const selector_engine_1 = __importDefault(require("bootstrap/js/src/dom/selector-engine"));
const scrollbar_1 = __importDefault(require("bootstrap/js/src/util/scrollbar"));
const base_component_1 = __importDefault(require("bootstrap/js/src/base-component"));
const backdrop_1 = __importDefault(require("bootstrap/js/src/util/backdrop"));
const focustrap_1 = __importDefault(require("bootstrap/js/src/util/focustrap"));
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const NAME = 'modal';
const DATA_KEY = 'bs.modal';
const EVENT_KEY = `.${DATA_KEY}`;
const ESCAPE_KEY = 'Escape';
const Default = {
    backdrop: true,
    keyboard: true,
    focus: true
};
const DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
};
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_RESIZE = `resize${EVENT_KEY}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class Modal extends base_component_1.default {
    constructor(element, config) {
        super(element);
        this._config = this._getConfig(config);
        this._dialog = selector_engine_1.default.findOne(SELECTOR_DIALOG, this._element);
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();
        this._isShown = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._scrollBar = new scrollbar_1.default();
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
        const showEvent = event_handler_1.default.trigger(this._element, EVENT_SHOW, {
            relatedTarget
        });
        if (showEvent.defaultPrevented) {
            return;
        }
        this._isShown = true;
        if (this._isAnimated()) {
            this._isTransitioning = true;
        }
        this._scrollBar.hide();
        document.body.classList.add(CLASS_NAME_OPEN);
        this._adjustDialog();
        this._setEscapeEvent();
        this._setResizeEvent();
        event_handler_1.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
            event_handler_1.default.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
                if (event.target === this._element) {
                    this._ignoreBackdropClick = true;
                }
            });
        });
        this._showBackdrop(() => this._showElement(relatedTarget));
    }
    hide() {
        if (!this._isShown || this._isTransitioning) {
            return;
        }
        const hideEvent = event_handler_1.default.trigger(this._element, EVENT_HIDE);
        if (hideEvent.defaultPrevented) {
            return;
        }
        this._isShown = false;
        const isAnimated = this._isAnimated();
        if (isAnimated) {
            this._isTransitioning = true;
        }
        this._setEscapeEvent();
        this._setResizeEvent();
        this._focustrap.deactivate();
        this._element.classList.remove(CLASS_NAME_SHOW);
        event_handler_1.default.off(this._element, EVENT_CLICK_DISMISS);
        event_handler_1.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
        this._queueCallback(() => this._hideModal(), this._element, isAnimated);
    }
    dispose() {
        [window, this._dialog].forEach((htmlElement) => event_handler_1.default.off(htmlElement, EVENT_KEY));
        this._backdrop.dispose();
        this._focustrap.deactivate();
        super.dispose();
    }
    handleUpdate() {
        this._adjustDialog();
    }
    // Private
    _initializeBackDrop() {
        return new backdrop_1.default({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated()
        });
    }
    _initializeFocusTrap() {
        return new focustrap_1.default({
            trapElement: this._element
        });
    }
    _getConfig(config) {
        config = Object.assign(Object.assign(Object.assign({}, Default), manipulator_1.default.getDataAttributes(this._element)), (typeof config === 'object' ? config : {}));
        (0, index_1.typeCheckConfig)(NAME, config, DefaultType);
        return config;
    }
    _showElement(relatedTarget) {
        const isAnimated = this._isAnimated();
        const modalBody = selector_engine_1.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // Don't move modal's DOM position
            document.body.append(this._element);
        }
        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.setAttribute('aria-modal', true);
        this._element.setAttribute('role', 'dialog');
        this._element.scrollTop = 0;
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
        if (isAnimated) {
            (0, index_1.reflow)(this._element);
        }
        this._element.classList.add(CLASS_NAME_SHOW);
        const transitionComplete = () => {
            if (this._config.focus) {
                this._focustrap.activate();
            }
            this._isTransitioning = false;
            event_handler_1.default.trigger(this._element, EVENT_SHOWN, {
                relatedTarget
            });
        };
        this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }
    _setEscapeEvent() {
        if (this._isShown) {
            event_handler_1.default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
                if (this._config.keyboard && event.key === ESCAPE_KEY) {
                    event.preventDefault();
                    this.hide();
                }
                else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
                    this._triggerBackdropTransition();
                }
            });
        }
        else {
            event_handler_1.default.off(this._element, EVENT_KEYDOWN_DISMISS);
        }
    }
    _setResizeEvent() {
        if (this._isShown) {
            event_handler_1.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
        }
        else {
            event_handler_1.default.off(window, EVENT_RESIZE);
        }
    }
    _hideModal() {
        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', true);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        this._isTransitioning = false;
        this._backdrop.hide(() => {
            document.body.classList.remove(CLASS_NAME_OPEN);
            this._resetAdjustments();
            this._scrollBar.reset();
            event_handler_1.default.trigger(this._element, EVENT_HIDDEN);
        });
    }
    _showBackdrop(callback) {
        event_handler_1.default.on(this._element, EVENT_CLICK_DISMISS, (event) => {
            if (this._ignoreBackdropClick) {
                this._ignoreBackdropClick = false;
                return;
            }
            if (event.target !== event.currentTarget) {
                return;
            }
            if (this._config.backdrop === true) {
                this.hide();
            }
            else if (this._config.backdrop === 'static') {
                this._triggerBackdropTransition();
            }
        });
        this._backdrop.show(callback);
    }
    _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_FADE);
    }
    _triggerBackdropTransition() {
        const hideEvent = event_handler_1.default.trigger(this._element, EVENT_HIDE_PREVENTED);
        if (hideEvent.defaultPrevented) {
            return;
        }
        const { classList, scrollHeight, style } = this._element;
        const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
        // return if the following background transition hasn't yet completed
        if ((!isModalOverflowing && style.overflowY === 'hidden') || classList.contains(CLASS_NAME_STATIC)) {
            return;
        }
        if (!isModalOverflowing) {
            style.overflowY = 'hidden';
        }
        classList.add(CLASS_NAME_STATIC);
        this._queueCallback(() => {
            classList.remove(CLASS_NAME_STATIC);
            if (!isModalOverflowing) {
                this._queueCallback(() => {
                    style.overflowY = '';
                }, this._dialog);
            }
        }, this._dialog);
        this._element.focus();
    }
    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------
    _adjustDialog() {
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const scrollbarWidth = this._scrollBar.getWidth();
        const isBodyOverflowing = scrollbarWidth > 0;
        if ((!isBodyOverflowing && isModalOverflowing && !(0, index_1.isRTL)()) || (isBodyOverflowing && !isModalOverflowing && (0, index_1.isRTL)())) {
            this._element.style.paddingLeft = `${scrollbarWidth}px`;
        }
        if ((isBodyOverflowing && !isModalOverflowing && !(0, index_1.isRTL)()) || (!isBodyOverflowing && isModalOverflowing && (0, index_1.isRTL)())) {
            this._element.style.paddingRight = `${scrollbarWidth}px`;
        }
    }
    _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
    }
    // Static
    static jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            const data = Modal.getOrCreateInstance(this, config);
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
exports.default = Modal;
