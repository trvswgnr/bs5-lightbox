export default Modal;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
declare class Modal {
    static get Default(): {
        backdrop: boolean;
        keyboard: boolean;
        focus: boolean;
    };
    static get NAME(): string;
    static jQueryInterface(config: any, relatedTarget: any): any;
    constructor(element: any, config: any);
    _config: any;
    _dialog: any;
    _backdrop: any;
    _focustrap: any;
    _isShown: boolean;
    _ignoreBackdropClick: boolean;
    _isTransitioning: boolean;
    _scrollBar: any;
    toggle(relatedTarget: any): void;
    show(relatedTarget: any): void;
    hide(): void;
    dispose(): void;
    handleUpdate(): void;
    _initializeBackDrop(): any;
    _initializeFocusTrap(): any;
    _getConfig(config: any): any;
    _showElement(relatedTarget: any): void;
    _setEscapeEvent(): void;
    _setResizeEvent(): void;
    _hideModal(): void;
    _showBackdrop(callback: any): void;
    _isAnimated(): any;
    _triggerBackdropTransition(): void;
    _adjustDialog(): void;
    _resetAdjustments(): void;
}
