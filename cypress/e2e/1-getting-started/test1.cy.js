/// <reference types="cypress" />

describe('basic functionality', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs/?debug=true')
	})

	it('correctly renders single image', () => {
		cy.get('[data-code="example-1"] [data-toggle="lightbox"]').should('have.length', 1).click()
		cy.get('.lightbox-carousel')
			.should('have.length', 1)
			.find('.img-fluid')
			.should('have.length', 1)
			.and(($img) => {
				// "naturalWidth" and "naturalHeight" are set when the image loads
				expect($img[0]?.naturalWidth).to.be.greaterThan(0)
			})
	})

	it('correctly renders a gallery', () => {
		cy.log('should render 6 thumbnails that open the gallery')
			.get('[data-code="example-2"] [data-toggle="lightbox"]')
			.should('have.length', 6)
			.first()
			.click()

		cy.log('gallery should have 6 images with width > 0')
			.get('.lightbox-carousel')
			.should('have.length', 1)
			.find('.img-fluid').as('images')
			.should('have.length', 6)
			.and(($images) => {
				$images.each((i, image) => {
					expect(image?.naturalWidth).to.be.greaterThan(0)
					console.log('#image', image)
				})
			})

		cy.log('first image in carousel should be visible')
			.get('@images')
			.first()
			.should('be.visible')

		cy.log('second image in carousel should not be visible')
			.get('@images')
			.eq(1)
			.should('not.be.visible')

		cy.get('.carousel-control-next').should('be.visible').click()
		cy.get('.carousel-item').first().should('not.have.class', 'active').next().should('have.class', 'active')

		cy.get('.btn-close').should('have.length', 1).click()

		cy.get('.lightbox-carousel').should('not.exist')
	})
})
