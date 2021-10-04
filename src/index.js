/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a new Lightbox instance.
 */

import Lightbox from '../dist/index.babel';

if (window.bootstrap) {
	window.bootstrap.Lightbox = Lightbox;
}
