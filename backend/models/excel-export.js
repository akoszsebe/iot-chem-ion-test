'use strict';
const excel = require('node-excel-export');

const ExcelExport = module.exports = function (db) {

  this.db = db;
  this.styles = {
    headerDark: {
      fill: {fgColor: {rgb: 'FF000000'}},
      font: {color: {rgb: 'FFFFFFFF'}, sz: 14, bold: true, underline: true}
    }
  }
};


ExcelExport.prototype.exportTemps = function (dateFrom, dateTo, callback) {

  this.db.getTemperatureInterval('1', dateFrom, dateTo, (returndata) => {

    const specification = {
      tempValue: { //
        displayName: 'Temperature',
        headerStyle: this.styles.headerDark,
        width: '20'
      },
      tempDate: {
        displayName: 'Read date',
        headerStyle: this.styles.headerDark,
        width: '20'
      }
    };

    const dataset = [];
    let date = new Date();
    returndata.forEach(temp => {
      date.setTime(temp.tempdate);
      dataset.push({tempValue: temp.tempvalue, tempDate: date});
    });

    const report = excel.buildExport(
      [
        {
          name: 'Report',
          heading: [],
          merges: [],
          specification: specification,
          data: dataset
        }
      ]
    );

    return callback(report);
  });
};


ExcelExport.prototype.exportPhs = function (dateFrom, dateTo, callback) {

  this.db.getPhInterval('1', dateFrom, dateTo, (returndata) => {

    const specification = {
      phValue: { //
        displayName: 'pH value',
        headerStyle: this.styles.headerDark,
        width: '20'
      },
      phDate: {
        displayName: 'Read date',
        headerStyle: this.styles.headerDark,
        width: '20'
      }
    };

    const dataset = [];
    let date = new Date();
    returndata.forEach(ph => {
      date.setTime(ph.phdate);
      dataset.push({phValue: ph.phvalue, phDate: date});
    });

    const report = excel.buildExport(
      [
        {
          name: 'Report',
          heading: [],
          merges: [],
          specification: specification,
          data: dataset
        }
      ]
    );

    return callback(report);
  });
};



ExcelExport.prototype.exportIons = function (dateFrom, dateTo, callback) {

    this.db.getIonInterval('1', dateFrom, dateTo, (returndata) => {

        const specification = {
            ionValue: { //
                displayName: 'ion value',
                headerStyle: this.styles.headerDark,
                width: '20'
            },
            ionDate: {
                displayName: 'Read date',
                headerStyle: this.styles.headerDark,
                width: '20'
            }
        };

        const dataset = [];
        let date = new Date();
        returndata.forEach(ion => {
            date.setTime(ion.iondate);
            dataset.push({ionValue: ion.ionvalue, ionDate: date});
        });

        const report = excel.buildExport(
            [
                {
                    name: 'Report',
                    heading: [],
                    merges: [],
                    specification: specification,
                    data: dataset
                }
            ]
        );

        return callback(report);
    });
};
























