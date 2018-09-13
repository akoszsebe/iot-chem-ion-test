'use strict'

let Res = require('../../backend/models/alive')
let Temp = require('../../backend/models/temperature')

describe('alive', () => {
	it('If it is alive', () => {
		let alive = new Res({ 'raspberryid':'1','alivedate':'4:0302' })
		expect(alive.raspberryid).toEqual('1'),
    expect(alive.alivedate).not.toBeNull()

		if (alive.alivedate != null)
    {
			describe('Temperatures', () => {
				it('Testing the temperature', () => {
					let func = new Temp({'raspberryid':'1', 'sensorid': '3', 'tempvalue':'28','tempdate':'1:20'})

					expect(func.raspberryid,func.sensorid).toEqual('1','2')

					expect(func.tempvalue).toEqual('28')
				})
			})

		}
		else{
			expect(alive.raspberryid).toEqual('2')
		}
	})
})
