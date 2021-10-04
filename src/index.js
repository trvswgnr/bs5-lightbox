/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a new Lightbox instance.
 */
import Lightbox from "./index.esm";
document.querySelectorAll(Lightbox.defaultSelector).forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    const lightbox = new Lightbox(el);
    lightbox.show();
}));
export default Lightbox;
