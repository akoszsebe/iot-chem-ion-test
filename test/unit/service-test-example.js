'use strict'

describe('jasmine unit test example: service', () => {

	let controller, testScope, httpBackend

	beforeEach(() => {
		module('kemia-app')

		inject(($rootScope, $controller, $httpBackend) => {
			testScope = $rootScope.$new()
			httpBackend = $httpBackend
			controller = $controller('HomeController', {
				scope: testScope
			})
		})
	})

	it('should call spy on usersFactory service', () => {
		httpBackend.expectGET('/users').respond(200, [{ 'lol': 'yolo'}])
		httpBackend.flush()
		testScope.$digest()

		expect(controller.users.length).toEqual(1)
		expect(controller.users[0].lol).toEqual('yolo')
	})
})
