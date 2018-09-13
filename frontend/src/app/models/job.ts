export class JobDO {

  constructor(public jobStartDate: number,
              public jobEndDate: number,
              public jobDescription: string,
              public heaterValue: number,
              public tempReadInt: number,
              public ionValue: number,
              public ionReadInt: number,
              public conductivityValue,
              public conductivityReadInt,
              public usedInterpolation: string,
              public usedValuePairs: string) {
  }
}
