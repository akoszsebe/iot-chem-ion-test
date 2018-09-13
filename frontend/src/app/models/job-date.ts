export class JobDateDO {

  constructor(public jobStartDate: Date,
              public jobEndDate: Date,
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
