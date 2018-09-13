export class TemperatureDO {

  constructor(public raspberryid: string,
              public sensorid: string,
              public tempvalue: number,
              public tempdate: number) {
  }
}
