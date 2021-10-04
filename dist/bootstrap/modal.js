/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("bootstrap/js/src/util/index");
var event_handler_1 = __importDefault(require("bootstrap/js/src/dom/event-handler"));
var manipulator_1 = __importDefault(require("bootstrap/js/src/dom/manipulator"));
var selector_engine_1 = __importDefault(require("bootstrap/js/src/dom/selector-engine"));
var scrollbar_1 = __importDefault(require("bootstrap/js/src/util/scrollbar"));
var base_component_1 = __importDefault(require("bootstrap/js/src/base-component"));
var backdrop_1 = __importDefault(require("bootstrap/js/src/util/backdrop"));
var focustrap_1 = __importDefault(require("bootstrap/js/src/util/focustrap"));
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
var NAME = 'modal';
var DATA_KEY = 'bs.modal';
var EVENT_KEY = "." + DATA_KEY;
var ESCAPE_KEY = 'Escape';
var Default = {
    backdrop: true,
    keyboard: true,
    focus: true
};
var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
};
var EVENT_HIDE = "hide" + EVENT_KEY;
var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY;
var EVENT_HIDDEN = "hidden" + EVENT_KEY;
var EVENT_SHOW = "show" + EVENT_KEY;
var EVENT_SHOWN = "shown" + EVENT_KEY;
var EVENT_RESIZE = "resize" + EVENT_KEY;
var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY;
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY;
var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY;
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY;
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(element, config) {
        var _this = _super.call(this, element) || this;
        _this._config = _this._getConfig(config);
        _this._dialog = selector_engine_1.default.findOne(SELECTOR_DIALOG, _this._element);
        _this._backdrop = _this._initializeBackDrop();
        _this._focustrap = _this._initializeFocusTrap();
        _this._isShown = false;
        _this._ignoreBackdropClick = false;
        _this._isTransitioning = false;
        _this._scrollBar = new scrollbar_1.default();
        return _this;
    }
    Object.defineProperty(Modal, "Default", {
        // Getters
        get: function () {
            return Default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal, "NAME", {
        get: function () {
            return NAME;
        },
        enumerable: false,
        configurable: true
    });
    // Public
    Modal.prototype.toggle = function (relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
    };
    Modal.prototype.show = function (relatedTarget) {
        var _this = this;
        if (this._isShown || this._isTransitioning) {
            return;
        }
        var showEvent = event_handler_1.default.trigger(this._element, EVENT_SHOW, {
            relatedTarget: relatedTarget
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
        event_handler_1.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
            event_handler_1.default.one(_this._element, EVENT_MOUSEUP_DISMISS, function (event) {
                if (event.target === _this._element) {
                    _this._ignoreBackdropClick = true;
                }
            });
        });
        this._showBackdrop(function () { return _this._showElement(relatedTarget); });
    };
    Modal.prototype.hide = function () {
        var _this = this;
        if (!this._isShown || this._isTransitioning) {
            return;
        }
        var hideEvent = event_handler_1.default.trigger(this._element, EVENT_HIDE);
        if (hideEvent.defaultPrevented) {
            return;
        }
        this._isShown = false;
        var isAnimated = this._isAnimated();
        if (isAnimated) {
            this._isTransitioning = true;
        }
        this._setEscapeEvent();
        this._setResizeEvent();
        this._focustrap.deactivate();
        this._element.classList.remove(CLASS_NAME_SHOW);
        event_handler_1.default.off(this._element, EVENT_CLICK_DISMISS);
        event_handler_1.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
        this._queueCallback(function () { return _this._hideModal(); }, this._element, isAnimated);
    };
    Modal.prototype.dispose = function () {
        [window, this._dialog].forEach(function (htmlElement) { return event_handler_1.default.off(htmlElement, EVENT_KEY); });
        this._backdrop.dispose();
        this._focustrap.deactivate();
        _super.prototype.dispose.call(this);
    };
    Modal.prototype.handleUpdate = function () {
        this._adjustDialog();
    };
    // Private
    Modal.prototype._initializeBackDrop = function () {
        return new backdrop_1.default({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated()
        });
    };
    Modal.prototype._initializeFocusTrap = function () {
        return new focustrap_1.default({
            trapElement: this._element
        });
    };
    Modal.prototype._getConfig = function (config) {
        config = __assign(__assign(__assign({}, Default), manipulator_1.default.getDataAttributes(this._element)), (typeof config === 'object' ? config : {}));
        (0, index_1.typeCheckConfig)(NAME, config, DefaultType);
        return config;
    };
    Modal.prototype._showElement = function (relatedTarget) {
        var _this = this;
        var isAnimated = this._isAnimated();
        var modalBody = selector_engine_1.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
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
        var transitionComplete = function () {
            if (_this._config.focus) {
                _this._focustrap.activate();
            }
            _this._isTransitioning = false;
            event_handler_1.default.trigger(_this._element, EVENT_SHOWN, {
                relatedTarget: relatedTarget
            });
        };
        this._queueCallback(transitionComplete, this._dialog, isAnimated);
    };
    Modal.prototype._setEscapeEvent = function () {
        var _this = this;
        if (this._isShown) {
            event_handler_1.default.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
                if (_this._config.keyboard && event.key === ESCAPE_KEY) {
                    event.preventDefault();
                    _this.hide();
                }
                else if (!_this._config.keyboard && event.key === ESCAPE_KEY) {
                    _this._triggerBackdropTransition();
                }
            });
        }
        else {
            event_handler_1.default.off(this._element, EVENT_KEYDOWN_DISMISS);
        }
    };
    Modal.prototype._setResizeEvent = function () {
        var _this = this;
        if (this._isShown) {
            event_handler_1.default.on(window, EVENT_RESIZE, function () { return _this._adjustDialog(); });
        }
        else {
            event_handler_1.default.off(window, EVENT_RESIZE);
        }
    };
    Modal.prototype._hideModal = function () {
        var _this = this;
        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', true);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        this._isTransitioning = false;
        this._backdrop.hide(function () {
            document.body.classList.remove(CLASS_NAME_OPEN);
            _this._resetAdjustments();
            _this._scrollBar.reset();
            event_handler_1.default.trigger(_this._element, EVENT_HIDDEN);
        });
    };
    Modal.prototype._showBackdrop = function (callback) {
        var _this = this;
        event_handler_1.default.on(this._element, EVENT_CLICK_DISMISS, function (event) {
            if (_this._ignoreBackdropClick) {
                _this._ignoreBackdropClick = false;
                return;
            }
            if (event.target !== event.currentTarget) {
                return;
            }
            if (_this._config.backdrop === true) {
                _this.hide();
            }
            else if (_this._config.backdrop === 'static') {
                _this._triggerBackdropTransition();
            }
        });
        this._backdrop.show(callback);
    };
    Modal.prototype._isAnimated = function () {
        return this._element.classList.contains(CLASS_NAME_FADE);
    };
    Modal.prototype._triggerBackdropTransition = function () {
        var _this = this;
        var hideEvent = event_handler_1.default.trigger(this._element, EVENT_HIDE_PREVENTED);
        if (hideEvent.defaultPrevented) {
            return;
        }
        var _a = this._element, classList = _a.classList, scrollHeight = _a.scrollHeight, style = _a.style;
        var isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
        // return if the following background transition hasn't yet completed
        if ((!isModalOverflowing && style.overflowY === 'hidden') || classList.contains(CLASS_NAME_STATIC)) {
            return;
        }
        if (!isModalOverflowing) {
            style.overflowY = 'hidden';
        }
        classList.add(CLASS_NAME_STATIC);
        this._queueCallback(function () {
            classList.remove(CLASS_NAME_STATIC);
            if (!isModalOverflowing) {
                _this._queueCallback(function () {
                    style.overflowY = '';
                }, _this._dialog);
            }
        }, this._dialog);
        this._element.focus();
    };
    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------
    Modal.prototype._adjustDialog = function () {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        var scrollbarWidth = this._scrollBar.getWidth();
        var isBodyOverflowing = scrollbarWidth > 0;
        if ((!isBodyOverflowing && isModalOverflowing && !(0, index_1.isRTL)()) || (isBodyOverflowing && !isModalOverflowing && (0, index_1.isRTL)())) {
            this._element.style.paddingLeft = scrollbarWidth + "px";
        }
        if ((isBodyOverflowing && !isModalOverflowing && !(0, index_1.isRTL)()) || (!isBodyOverflowing && isModalOverflowing && (0, index_1.isRTL)())) {
            this._element.style.paddingRight = scrollbarWidth + "px";
        }
    };
    Modal.prototype._resetAdjustments = function () {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
    };
    // Static
    Modal.jQueryInterface = function (config, relatedTarget) {
        return this.each(function () {
            var data = Modal.getOrCreateInstance(this, config);
            if (typeof config !== 'string') {
                return;
            }
            if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
            }
            data[config](relatedTarget);
        });
    };
    return Modal;
}(base_component_1.default));
exports.default = Modal;
