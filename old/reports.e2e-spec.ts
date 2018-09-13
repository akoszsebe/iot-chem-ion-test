import {browser, by, element} from 'protractor';
describe('Reports Component', () => {

  let loadTempButton, loadPhButton, exportTempButton, exportPhButton;
  let calendarTemp1, calendarTemp2, calendarPh1, calendarPh2;
  let tempChart, phChart;
  let phTab, tempTab;

  beforeEach(() => {
    browser.get('/reports');

    loadTempButton = element(by.id('loadTempButton'));
    loadPhButton = element(by.id('loadPhButton'));
    exportTempButton = element(by.id('exportTempButton'));
    exportPhButton = element(by.id('exportPhButton'));

    calendarTemp1 = element(by.id('calendarTemp1'));
    calendarTemp2 = element(by.id('calendarTemp2'));
    calendarPh1 = element(by.id('calendarPh1'));
    calendarPh2 = element(by.id('calendarPh2'));

    tempChart = element(by.id('tempChart'));
    phChart = element(by.id('phChart'));

    tempTab = element(by.id('md-tab-label-0-0'));
    phTab = element(by.id('md-tab-label-0-1'));

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


  it('should display the ph page when clicking the ph tab', () => {
    phTab.click();
    browser.sleep(1000);

    expect(loadPhButton.isPresent());
    expect(loadPhButton.isDisplayed());
    expect(loadPhButton.isEnabled());

    expect(exportPhButton.isPresent());
    expect(exportPhButton.isDisplayed());
    expect(exportPhButton.isEnabled());

    expect(calendarPh1.isPresent());
    expect(calendarPh1.isDisplayed());

    expect(calendarPh2.isPresent());
    expect(calendarPh2.isDisplayed());

    expect(phChart.isPresent());
    expect(phChart.isDisplayed());
  });
});
