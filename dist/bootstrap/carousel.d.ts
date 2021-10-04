export default Carousel;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
declare class Carousel {
    static get Default(): {
        interval: number;
        keyboard: boolean;
        slide: boolean;
        pause: string;
        wrap: boolean;
        touch: boolean;
    };
    static get NAME(): string;
    static carouselInterface(element: any, config: any): void;
    static jQueryInterface(config: any): any;
    static dataApiClickHandler(event: any): void;
    constructor(element: any, config: any);
    _items: any;
    _interval: NodeJS.Timer;
    _activeElement: any;
    _isPaused: boolean;
    _isSliding: boolean;
    touchTimeout: NodeJS.Timeout;
    touchStartX: number;
    touchDeltaX: number;
    _config: any;
    _indicatorsElement: any;
    _touchSupported: boolean;
    _pointerEvent: boolean;
    next(): void;
    nextWhenVisible(): void;
    prev(): void;
    pause(event: any): void;
    cycle(event: any): void;
    to(index: any): void;
    _getConfig(config: any): any;
    _handleSwipe(): void;
    _addEventListeners(): void;
    dispose(): void;
    _addTouchEventListeners(): void;
    _keydown(event: any): void;
    _getItemIndex(element: any): any;
    _getItemByOrder(order: any, activeElement: any): any;
    _triggerSlideEvent(relatedTarget: any, eventDirectionName: any): any;
    _setActiveIndicatorElement(element: any): void;
    _updateInterval(): void;
    _slide(directionOrOrder: any, element: any): void;
    _directionToOrder(direction: any): any;
    _orderToDirection(order: any): any;
}
