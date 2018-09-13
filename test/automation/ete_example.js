
'use strict'

describe('Protractor end to end tests for iotWithChem', () => {
	it('should have a title', () => {

    // global object from Protractor
		browser.get('http://localhost:8081/about')

		let text = element(by.css('h3'))

		expect(browser.getTitle()).toEqual('Kemia App')
		expect(text.getText()).toEqual('About page')
		expect(text.isPresent()).toBe(true)
	})
})
