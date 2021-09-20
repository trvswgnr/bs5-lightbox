/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */

 import Modal from 'bootstrap/js/dist/modal';
 import Carousel from 'bootstrap/js/dist/carousel';
 
 class Lightbox {
     #settings = {
         target: '[data-toggle="lightbox"]'
     }
 
     #hash = this.#randomHash();
 
     constructor(options = {}) {
         if (typeof options === 'string') {
             this.#settings.target = options;
             options = {};
         }
 
         this.#settings = {
             ...this.#settings,
             ...options
         };
 
         document.querySelectorAll(this.#settings.target).forEach(el => {
             el.addEventListener('click', e => {
                 e.preventDefault();
                 this.src = el.href || el.dataset.remote || 'http://via.placeholder.com/1600x900';
                 this.sources = el.dataset.gallery ? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${el.dataset.gallery}"]`), v => v.href || v.dataset.remote || 'http://via.placeholder.com/1600x900'))] : [this.src];
                 this.#createCarousel();
                 this.#createModal();
             });
         });
     }
 
     #createCarousel() {
         const template = document.createElement('template');
         const slidesHtml = this.sources.map((src, i) => `<div class="carousel-item ${i === this.sources.indexOf(this.src) ? 'active' : ''}"><img src="${src}" class="d-block w-100"></div>`).join('');
         const controlsHtml = this.sources.length < 1 ? '' : `
             <button class="carousel-control carousel-control-prev" type="button" data-bs-target="#lightboxCarousel-${this.#hash}" data-bs-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="visually-hidden">Previous</span>
                 </button>
                 <button class="carousel-control carousel-control-next" type="button" data-bs-target="#lightboxCarousel-${this.#hash}" data-bs-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="visually-hidden">Next</span>
             </button>`;
 
         const html = `
             <div id="lightboxCarousel-${this.#hash}" class="lightbox-carousel carousel" data-interval="false">
                 <div class="carousel-inner">
                     ${slidesHtml}
                 </div>
                 ${controlsHtml}
             </div>`;
 
         template.innerHTML = html.trim();
         this.carouselEl = template.content.firstChild;
     }
 
     #createModal() {
         const template = document.createElement('template');
         const html = `
             <div class="modal lightbox fade" id="lightboxModal-${this.#hash}" tabindex="-1" aria-hidden="true">
                 <div class="modal-dialog modal-dialog-centered modal-xl">
                     <div class="modal-content">
                         <div class="modal-body p-0">
                             <button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2;"></button>
                         </div>
                     </div>
                 </div>
             </div>`;
 
         template.innerHTML = html.trim();
 
         this.modalEl = template.content.firstChild;
         this.modalEl.querySelector('.modal-body').appendChild(this.carouselEl);
         this.modalEl.addEventListener('hidden.bs.modal', e => this.modalEl.remove());
         document.body.appendChild(this.modalEl);
 
         this.modal = new Modal(this.modalEl);
         this.modal.show();
     }
 
     /**
      * Generate a random hash of a determined length
      *
      * @param {number} length Length of the hash to generate
      * @returns Random hash
      */
     #randomHash(length = 8) {
         return Array.from({length}, () => Math.floor(Math.random() * 36).toString(36)).join('');
     }
 }
 
 export default Lightbox
 