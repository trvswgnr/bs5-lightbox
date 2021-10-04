/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.1): carousel.js
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("bootstrap/js/src/util/index");
var event_handler_1 = __importDefault(require("bootstrap/js/src/dom/event-handler"));
var manipulator_1 = __importDefault(require("bootstrap/js/src/dom/manipulator"));
var selector_engine_1 = __importDefault(require("bootstrap/js/src/dom/selector-engine"));
var base_component_1 = __importDefault(require("bootstrap/js/src/base-component"));
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
var NAME = 'carousel';
var DATA_KEY = 'bs.carousel';
var EVENT_KEY = "." + DATA_KEY;
var ARROW_LEFT_KEY = 'ArrowLeft';
var ARROW_RIGHT_KEY = 'ArrowRight';
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
var SWIPE_THRESHOLD = 40;
var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
};
var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
};
var ORDER_NEXT = 'next';
var ORDER_PREV = 'prev';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';
var KEY_TO_DIRECTION = (_a = {},
    _a[ARROW_LEFT_KEY] = DIRECTION_RIGHT,
    _a[ARROW_RIGHT_KEY] = DIRECTION_LEFT,
    _a);
var EVENT_SLIDE = "slide" + EVENT_KEY;
var EVENT_SLID = "slid" + EVENT_KEY;
var EVENT_KEYDOWN = "keydown" + EVENT_KEY;
var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY;
var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY;
var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY;
var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY;
var EVENT_TOUCHEND = "touchend" + EVENT_KEY;
var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY;
var EVENT_POINTERUP = "pointerup" + EVENT_KEY;
var EVENT_DRAG_START = "dragstart" + EVENT_KEY;
var CLASS_NAME_CAROUSEL = 'carousel';
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_SLIDE = 'slide';
var CLASS_NAME_END = 'carousel-item-end';
var CLASS_NAME_START = 'carousel-item-start';
var CLASS_NAME_NEXT = 'carousel-item-next';
var CLASS_NAME_PREV = 'carousel-item-prev';
var CLASS_NAME_POINTER_EVENT = 'pointer-event';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
var SELECTOR_ITEM = '.carousel-item';
var SELECTOR_ITEM_IMG = '.carousel-item img';
var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
var SELECTOR_INDICATORS = '.carousel-indicators';
var SELECTOR_INDICATOR = '[data-bs-target]';
var POINTER_TYPE_TOUCH = 'touch';
var POINTER_TYPE_PEN = 'pen';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel(element, config) {
        var _this = _super.call(this, element) || this;
        _this._items = null;
        _this._interval = null;
        _this._activeElement = null;
        _this._isPaused = false;
        _this._isSliding = false;
        _this.touchTimeout = null;
        _this.touchStartX = 0;
        _this.touchDeltaX = 0;
        _this._config = _this._getConfig(config);
        _this._indicatorsElement = selector_engine_1.default.findOne(SELECTOR_INDICATORS, _this._element);
        _this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        _this._pointerEvent = Boolean(window.PointerEvent);
        _this._addEventListeners();
        return _this;
    }
    Object.defineProperty(Carousel, "Default", {
        // Getters
        get: function () {
            return Default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Carousel, "NAME", {
        get: function () {
            return NAME;
        },
        enumerable: false,
        configurable: true
    });
    // Public
    Carousel.prototype.next = function () {
        this._slide(ORDER_NEXT);
    };
    Carousel.prototype.nextWhenVisible = function () {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && (0, index_1.isVisible)(this._element)) {
            this.next();
        }
    };
    Carousel.prototype.prev = function () {
        this._slide(ORDER_PREV);
    };
    Carousel.prototype.pause = function (event) {
        if (!event) {
            this._isPaused = true;
        }
        if (selector_engine_1.default.findOne(SELECTOR_NEXT_PREV, this._element)) {
            (0, index_1.triggerTransitionEnd)(this._element);
            this.cycle(true);
        }
        clearInterval(this._interval);
        this._interval = null;
    };
    Carousel.prototype.cycle = function (event) {
        if (!event) {
            this._isPaused = false;
        }
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
        if (this._config && this._config.interval && !this._isPaused) {
            this._updateInterval();
            this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
    };
    Carousel.prototype.to = function (index) {
        var _this = this;
        this._activeElement = selector_engine_1.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
        var activeIndex = this._getItemIndex(this._activeElement);
        if (index > this._items.length - 1 || index < 0) {
            return;
        }
        if (this._isSliding) {
            event_handler_1.default.one(this._element, EVENT_SLID, function () { return _this.to(index); });
            return;
        }
        if (activeIndex === index) {
            this.pause();
            this.cycle();
            return;
        }
        var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
        this._slide(order, this._items[index]);
    };
    // Private
    Carousel.prototype._getConfig = function (config) {
        config = __assign(__assign(__assign({}, Default), manipulator_1.default.getDataAttributes(this._element)), (typeof config === 'object' ? config : {}));
        (0, index_1.typeCheckConfig)(NAME, config, DefaultType);
        return config;
    };
    Carousel.prototype._handleSwipe = function () {
        var absDeltax = Math.abs(this.touchDeltaX);
        if (absDeltax <= SWIPE_THRESHOLD) {
            return;
        }
        var direction = absDeltax / this.touchDeltaX;
        this.touchDeltaX = 0;
        if (!direction) {
            return;
        }
        this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
    };
    Carousel.prototype._addEventListeners = function () {
        var _this = this;
        if (this._config.keyboard) {
            event_handler_1.default.on(this._element, EVENT_KEYDOWN, function (event) { return _this._keydown(event); });
        }
        if (this._config.pause === 'hover') {
            event_handler_1.default.on(this._element, EVENT_MOUSEENTER, function (event) { return _this.pause(event); });
            event_handler_1.default.on(this._element, EVENT_MOUSELEAVE, function (event) { return _this.cycle(event); });
        }
        if (this._config.touch && this._touchSupported) {
            this._addTouchEventListeners();
        }
    };
    Carousel.prototype.dispose = function () {
        var _this = this;
        Data.remove(this._element, this.constructor.DATA_KEY);
        event_handler_1.default.off(this._element, this.constructor.EVENT_KEY);
        Object.getOwnPropertyNames(this).forEach(function (propertyName) {
            _this[propertyName] = null;
        });
    };
    Carousel.prototype._addTouchEventListeners = function () {
        var _this = this;
        var hasPointerPenTouch = function (event) {
            return _this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
        };
        var start = function (event) {
            if (hasPointerPenTouch(event)) {
                _this.touchStartX = event.clientX;
            }
            else if (!_this._pointerEvent) {
                _this.touchStartX = event.touches[0].clientX;
            }
        };
        var move = function (event) {
            // ensure swiping with one touch and not pinching
            _this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - _this.touchStartX;
        };
        var end = function (event) {
            if (hasPointerPenTouch(event)) {
                _this.touchDeltaX = event.clientX - _this.touchStartX;
            }
            _this._handleSwipe();
            if (_this._config.pause === 'hover') {
                // If it's a touch-enabled device, mouseenter/leave are fired as
                // part of the mouse compatibility events on first tap - the carousel
                // would stop cycling until user tapped out of it;
                // here, we listen for touchend, explicitly pause the carousel
                // (as if it's the second time we tap on it, mouseenter compat event
                // is NOT fired) and after a timeout (to allow for mouse compatibility
                // events to fire) we explicitly restart cycling
                _this.pause();
                if (_this.touchTimeout) {
                    clearTimeout(_this.touchTimeout);
                }
                _this.touchTimeout = setTimeout(function (event) { return _this.cycle(event); }, TOUCHEVENT_COMPAT_WAIT + _this._config.interval);
            }
        };
        selector_engine_1.default.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
            event_handler_1.default.on(itemImg, EVENT_DRAG_START, function (e) { return e.preventDefault(); });
        });
        if (this._pointerEvent) {
            event_handler_1.default.on(this._element, EVENT_POINTERDOWN, function (event) { return start(event); });
            event_handler_1.default.on(this._element, EVENT_POINTERUP, function (event) { return end(event); });
            this._element.classList.add(CLASS_NAME_POINTER_EVENT);
        }
        else {
            event_handler_1.default.on(this._element, EVENT_TOUCHSTART, function (event) { return start(event); });
            event_handler_1.default.on(this._element, EVENT_TOUCHMOVE, function (event) { return move(event); });
            event_handler_1.default.on(this._element, EVENT_TOUCHEND, function (event) { return end(event); });
        }
    };
    Carousel.prototype._keydown = function (event) {
        if (/input|textarea/i.test(event.target.tagName)) {
            return;
        }
        var direction = KEY_TO_DIRECTION[event.key];
        if (direction) {
            event.preventDefault();
            this._slide(direction);
        }
    };
    Carousel.prototype._getItemIndex = function (element) {
        this._items = element && element.parentNode ? selector_engine_1.default.find(SELECTOR_ITEM, element.parentNode) : [];
        return this._items.indexOf(element);
    };
    Carousel.prototype._getItemByOrder = function (order, activeElement) {
        var isNext = order === ORDER_NEXT;
        return (0, index_1.getNextActiveElement)(this._items, activeElement, isNext, this._config.wrap);
    };
    Carousel.prototype._triggerSlideEvent = function (relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);
        var fromIndex = this._getItemIndex(selector_engine_1.default.findOne(SELECTOR_ACTIVE_ITEM, this._element));
        return event_handler_1.default.trigger(this._element, EVENT_SLIDE, {
            relatedTarget: relatedTarget,
            direction: eventDirectionName,
            from: fromIndex,
            to: targetIndex
        });
    };
    Carousel.prototype._setActiveIndicatorElement = function (element) {
        if (this._indicatorsElement) {
            var activeIndicator = selector_engine_1.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
            activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
            activeIndicator.removeAttribute('aria-current');
            var indicators = selector_engine_1.default.find(SELECTOR_INDICATOR, this._indicatorsElement);
            for (var i = 0; i < indicators.length; i++) {
                if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
                    indicators[i].classList.add(CLASS_NAME_ACTIVE);
                    indicators[i].setAttribute('aria-current', 'true');
                    break;
                }
            }
        }
    };
    Carousel.prototype._updateInterval = function () {
        var element = this._activeElement || selector_engine_1.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
        if (!element) {
            return;
        }
        var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
        if (elementInterval) {
            this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
            this._config.interval = elementInterval;
        }
        else {
            this._config.interval = this._config.defaultInterval || this._config.interval;
        }
    };
    Carousel.prototype._slide = function (directionOrOrder, element) {
        var _this = this;
        var order = this._directionToOrder(directionOrOrder);
        var activeElement = selector_engine_1.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
        var activeElementIndex = this._getItemIndex(activeElement);
        var nextElement = element || this._getItemByOrder(order, activeElement);
        var nextElementIndex = this._getItemIndex(nextElement);
        var isCycling = Boolean(this._interval);
        var isNext = order === ORDER_NEXT;
        var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
        var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
        var eventDirectionName = this._orderToDirection(order);
        if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
            this._isSliding = false;
            return;
        }
        if (this._isSliding) {
            return;
        }
        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
        if (slideEvent.defaultPrevented) {
            return;
        }
        if (!activeElement || !nextElement) {
            // Some weirdness is happening, so we bail
            return;
        }
        this._isSliding = true;
        if (isCycling) {
            this.pause();
        }
        this._setActiveIndicatorElement(nextElement);
        this._activeElement = nextElement;
        var triggerSlidEvent = function () {
            event_handler_1.default.trigger(_this._element, EVENT_SLID, {
                relatedTarget: nextElement,
                direction: eventDirectionName,
                from: activeElementIndex,
                to: nextElementIndex
            });
        };
        if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
            nextElement.classList.add(orderClassName);
            (0, index_1.reflow)(nextElement);
            activeElement.classList.add(directionalClassName);
            nextElement.classList.add(directionalClassName);
            var completeCallBack = function () {
                nextElement.classList.remove(directionalClassName, orderClassName);
                nextElement.classList.add(CLASS_NAME_ACTIVE);
                activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
                _this._isSliding = false;
                setTimeout(triggerSlidEvent, 0);
            };
            this._queueCallback(completeCallBack, activeElement, true);
        }
        else {
            activeElement.classList.remove(CLASS_NAME_ACTIVE);
            nextElement.classList.add(CLASS_NAME_ACTIVE);
            this._isSliding = false;
            triggerSlidEvent();
        }
        if (isCycling) {
            this.cycle();
        }
    };
    Carousel.prototype._directionToOrder = function (direction) {
        if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
            return direction;
        }
        if ((0, index_1.isRTL)()) {
            return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
        }
        return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    };
    Carousel.prototype._orderToDirection = function (order) {
        if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
            return order;
        }
        if ((0, index_1.isRTL)()) {
            return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    };
    // Static
    Carousel.carouselInterface = function (element, config) {
        var data = Carousel.getOrCreateInstance(element, config);
        var _config = data._config;
        if (typeof config === 'object') {
            _config = __assign(__assign({}, _config), config);
        }
        var action = typeof config === 'string' ? config : _config.slide;
        if (typeof config === 'number') {
            data.to(config);
        }
        else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
                throw new TypeError("No method named \"" + action + "\"");
            }
            data[action]();
        }
        else if (_config.interval && _config.ride) {
            data.pause();
            data.cycle();
        }
    };
    Carousel.jQueryInterface = function (config) {
        return this.each(function () {
            Carousel.carouselInterface(this, config);
        });
    };
    Carousel.dataApiClickHandler = function (event) {
        var target = (0, index_1.getElementFromSelector)(this);
        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
            return;
        }
        var config = __assign(__assign({}, manipulator_1.default.getDataAttributes(target)), manipulator_1.default.getDataAttributes(this));
        console.log(config);
        var slideIndex = this.getAttribute('data-bs-slide-to');
        if (slideIndex) {
            config.interval = false;
        }
        Carousel.carouselInterface(target, config);
        if (slideIndex) {
            Carousel.getInstance(target).to(slideIndex);
        }
        event.preventDefault();
    };
    return Carousel;
}(base_component_1.default));
exports.default = Carousel;
