import {browser, by, element} from 'protractor';
describe('Calibration Component', () => {

  let calibrateButton, steps, level;

  beforeEach(() => {
    browser.get('/calibration');

    calibrateButton = element(by.id('calibrateButton'));
    steps = element(by.id('steps'));
    level = element(by.model('currentLevel'));
    browser.sleep(1000);
  });

  it('should display the calibration component correctly at load', () => {

    expect(calibrateButton.isPresent());
    expect(calibrateButton.isDisplayed());
    expect(calibrateButton.isEnabled()).toBe(true);
    expect(calibrateButton.getText()).toEqual('Calibrate Low');

    expect(steps.isPresent());
    expect(steps.isDisplayed());
  });

  it('should display the correct calibration level on the button', () => {
    calibrateButton.click();
    browser.sleep(7000);
    expect(calibrateButton.getText()).toBe('Calibrate Mid');
    calibrateButton.click();
    browser.sleep(7000);
    expect(calibrateButton.getText()).toBe('Calibrate High');
    calibrateButton.click();
    browser.sleep(7000);
    expect(calibrateButton.getText()).toBe('Calibrate again');
    calibrateButton.click();
    browser.sleep(1000);
    expect(calibrateButton.getText()).toBe('Calibrate Low');
  });

  it('should increase level to 3 and then back again to 0', () => {
    expect(steps.getAttribute('ng-reflect-active-index')).toEqual('0');
    calibrateButton.click();
    browser.sleep(7000);
    expect(steps.getAttribute('ng-reflect-active-index')).toEqual('1');
    calibrateButton.click();
    browser.sleep(7000);
    expect(steps.getAttribute('ng-reflect-active-index')).toEqual('2');
    calibrateButton.click();
    browser.sleep(7000);
    expect(steps.getAttribute('ng-reflect-active-index')).toEqual('3');
    calibrateButton.click();
    browser.sleep(1000);
    expect(steps.getAttribute('ng-reflect-active-index')).toEqual('0');
  });


});
