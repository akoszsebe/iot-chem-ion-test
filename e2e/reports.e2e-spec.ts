import {browser, by, element} from 'protractor';
describe('Reports Component', () => {

  let loadTempButton, loadIonButton, exportTempButton, exportIonButton;
  let calendarTemp1, calendarTemp2, calendarIon1, calendarIon2;
  let tempChart, ionChart;
  let ionTab, tempTab;

  beforeEach(() => {
    browser.get('/reports');
    
    loadTempButton = element(by.id('loadTempButton'));
    loadIonButton = element(by.id('loadIonButton'));
    exportTempButton = element(by.id('exportTempButton'));
    exportIonButton = element(by.id('exportIonButton'));

    calendarTemp1 = element(by.id('calendarTemp1'));
    calendarTemp2 = element(by.id('calendarTemp2'));
    calendarIon1 = element(by.id('calendarIon1'));
    calendarIon2 = element(by.id('calendarIon2'));

    tempChart = element(by.id('tempChart'));
    ionChart = element(by.id('ionChart'));

    tempTab = element(by.id('mat-tab-label-0-0'));
    ionTab = element(by.id('mat-tab-label-0-1'));

    browser.sleep(1000);
  });


  it('should display the page correctly after load', () => {
    expect(loadTempButton.isPresent());
    expect(loadTempButton.isDisplayed());
    expect(loadTempButton.isEnabled());

    expect(exportTempButton.isPresent());
    expect(exportTempButton.isDisplayed());
    expect(exportTempButton.isEnabled());

    expect(calendarTemp1.isPresent());
    expect(calendarTemp1.isDisplayed());

    expect(calendarTemp2.isPresent());
    expect(calendarTemp2.isDisplayed());

    expect(tempChart.isPresent());
    expect(tempChart.isDisplayed());
  });

  it('should display the current date and the day before in the datetime pickers by default', () => {

    const now = new Date().toDateString();
    const date = new Date();
    date.setDate((new Date()).getDate() - 1);
    const yesterday = date.toDateString();

    const calendarValue1 = calendarTemp1.getAttribute('ng-reflect-model');
    const calendarValue2 = calendarTemp2.getAttribute('ng-reflect-model');

    expect(calendarValue1).toContain(yesterday);
    expect(calendarValue2).toContain(now);
  });


  it('should display the ion page when clicking the ion tab', () => {
    ionTab.click();
    browser.sleep(1000);

    expect(loadIonButton.isPresent());
    expect(loadIonButton.isDisplayed());
    expect(loadIonButton.isEnabled());

    expect(exportIonButton.isPresent());
    expect(exportIonButton.isDisplayed());
    expect(exportIonButton.isEnabled());

    expect(calendarIon1.isPresent());
    expect(calendarIon1.isDisplayed());

    expect(calendarIon2.isPresent());
    expect(calendarIon2.isDisplayed());

    expect(ionChart.isPresent());
    expect(ionChart.isDisplayed());
  });

  it('should display the temperature page when clicking the temp tab', () => {
    ionTab.click();
    browser.sleep(1000);
    tempTab.click();
    browser.sleep(1000);

    expect(loadTempButton.isPresent());
    expect(loadTempButton.isDisplayed());
    expect(loadTempButton.isEnabled());

    expect(exportTempButton.isPresent());
    expect(exportTempButton.isDisplayed());
    expect(exportTempButton.isEnabled());

    expect(calendarTemp1.isPresent());
    expect(calendarTemp1.isDisplayed());

    expect(calendarTemp2.isPresent());
    expect(calendarTemp2.isDisplayed());

    expect(tempChart.isPresent());
    expect(tempChart.isDisplayed());
  });
});
