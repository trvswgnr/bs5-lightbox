/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a new Lightbox instance.
 */

import Lightbox from "./index.esm";

document.querySelectorAll(Lightbox.defaultSelector).forEach((el: any) => el.addEventListener('click', (e: Event) => {
	e.preventDefault()
	const lightbox: Lightbox = new Lightbox(el)
	lightbox.show()
}))

export default Lightbox;
