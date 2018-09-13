'use strict'

describe('jasmine unit test example: controller', () => {

	let testScope, controller, usersFactoryMock

	usersFactoryMock = {
		getUsers: function() {
			return {
				then: function(callback) {
					return callback([{ userName: 'fakeVotiv' }])
				}
			}
		}
	}

	beforeEach(() => {
		module('kemia-app')

		inject(($rootScope, $controller) => {
			testScope = $rootScope.$new()
			controller = $controller('HomeController', {
				$scope: testScope,
				usersFactory: usersFactoryMock
			})
		})
	})

	it('should get users from mocked service and save them to controllers scope', () => {
		testScope.$digest()

		expect(controller.users.length).toEqual(1)
		expect(controller.users[0].userName).toEqual('fakeVotiv')
	})
})
