

'use strict'

let Gateway = require('../../backend/pi/devices/gateway')


describe(' Gateway test fixtures ', () => {

	it('Fingerprint check for Laszlo gateway - True ', () => {


            // create a new gateway
		var laszlogatewayfingerprint = '000000004064b4d2' 
		var gateway =  new Gateway()

		expect(gateway.fingerPrint()).toEqual(laszlogatewayfingerprint)

	})


})