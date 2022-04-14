import EventHandler from 'bootstrap/js/dist/dom/event-handler'

const randomHash = (length = 8) => {
  return 'L' + Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('')
}

const createModalEl = modalContent => {
  const div = document.createElement('div')
  div.classList.add('modal', 'fade', 'lightbox')
  div.id = randomHash()
  div.innerHTML = `
		<div class="modal-dialog lightbox-dialog modal-dialog-centered">
			<div class="modal-content lightbox-content">
				<div class="modal-header lightbox-header">
					<h5 class="modal-title lightbox-title" id="${div.id}">Lightbox title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="lightbox" aria-label="Close"></button>
				</div>
				<div class="modal-body lightbox-body"></div>
				<div class="modal-footer">

  <button type="button" id="testLightbox2" class="btn btn-secondary" data-bs-toggle="lightbox">
  Launch demo lightbox2
</button></div>
			</div>
		</div>`
  div.querySelector('.lightbox-body').append(modalContent)
  return div
}

const createCarouseEl = () => {
  const div = document.createElement('div')
  div.id = randomHash()
  div.classList.add('carousel', 'slide')
  div.innerHTML = `
		<div class="carousel-inner bg-dark text-white">
			<div class="carousel-item active">
				<p>Slide 1</p>
			</div>
			<div class="carousel-item">
				<p>Slide 2</p>
			</div>
			<div class="carousel-item">
				<p>Slide 3</p>
			</div>
		</div>
		<button class="carousel-control-prev" type="button" data-bs-target="#${div.id}" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#${div.id}" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>`
  return div
}

const modalEventsHandler = (element, event) => {
  const args = Object.fromEntries(Object.getOwnPropertyNames(event).map(prop => [prop, event[prop]]))
  delete args.isTrusted
  const type = event.type.replace(/(modal|carousel)/, 'lightbox')
  EventHandler.trigger(element, type, args)
}

export { createModalEl, createCarouseEl, modalEventsHandler }
