import {browser, by, element, protractor} from 'protractor';
describe('Experiment Component', () => {

  let stopJobButton, addJobButton, tempSettingsButton, phSettingsButton;
  let valueInput, intervalInput, okButton, cancelButton;
  let pumpValue, phReadInterval;

  beforeEach(() => {
    browser.get('/experiment');
    browser.ignoreSynchronization = true;

    stopJobButton = element(by.id('stopJobButton'));
    addJobButton = element(by.id('addJobButton'));
    tempSettingsButton = element(by.id('tempSettingsButton'));
    phSettingsButton = element(by.id('phSettingsButton'));

    browser.sleep(1000);
  });

  it('should display the buttons at load', () => {
    expect(stopJobButton.isPresent());
    expect(stopJobButton.isDisplayed());
    expect(stopJobButton.isEnabled());

    expect(addJobButton.isPresent());
    expect(addJobButton.isDisplayed());
    expect(addJobButton.isEnabled());

    expect(tempSettingsButton.isPresent());
    expect(tempSettingsButton.isDisplayed());
    expect(tempSettingsButton.isEnabled());

    expect(phSettingsButton.isPresent());
    expect(phSettingsButton.isDisplayed());
    expect(phSettingsButton.isEnabled());
  });

  it('should display a specific dialog when pressing the temp settings button', () => {

    tempSettingsButton.click();
    browser.sleep(1000);

    valueInput = element(by.id('valueInput'));
    intervalInput = element(by.id('intervalInput'));
    cancelButton = element(by.id('cancelButton'));
    okButton = element(by.id('okButton'));

    expect(valueInput.isDisplayed());
    expect(intervalInput.isDisplayed());
    expect(okButton.isDisplayed());
    expect(okButton.isEnabled());
    expect(cancelButton.isDisplayed());
    expect(cancelButton.isEnabled());
  });


  it('should display a specific dialog when pressing the ph settings button', () => {

    phSettingsButton.click();
    browser.sleep(1000);

    valueInput = element(by.id('valueInput'));
    intervalInput = element(by.id('intervalInput'));
    cancelButton = element(by.id('cancelButton'));
    okButton = element(by.id('okButton'));

    expect(valueInput.isDisplayed());
    expect(intervalInput.isDisplayed());
    expect(okButton.isDisplayed());
    expect(okButton.isEnabled());
    expect(cancelButton.isDisplayed());
    expect(cancelButton.isEnabled());
  });


  it('should display the old settings value in the dialog input fields', () => {

    pumpValue = element(by.id('pumpValue'));
    phReadInterval = element(by.id('phReadInterval'));
    const oldValue = pumpValue.getText();
    const oldInterval = phReadInterval.getText();

    phSettingsButton.click();
    browser.sleep(1000);

    valueInput = element(by.id('valueInput'));
    intervalInput = element(by.id('intervalInput'));
    const newValue = valueInput.getAttribute('value');
    const newInterval = intervalInput.getAttribute('value');

    expect(oldValue).toEqual(valueInput.getAttribute('value'));
    expect(oldInterval).toEqual(intervalInput.getAttribute('value'));
  });


  it('should update the ph settings after clicking Ok in the dialog', () => {

    pumpValue = element(by.id('pumpValue'));
    phReadInterval = element(by.id('phReadInterval'));
    const oldValue = pumpValue.getText();
    const oldInterval = phReadInterval.getText();

    phSettingsButton.click();
    browser.sleep(1000);

    valueInput = element(by.id('valueInput'));
    intervalInput = element(by.id('intervalInput'));

    const newValue = '7';
    const newInterval = '30';

    valueInput.sendKeys(protractor.Key.BACK_SPACE, protractor.Key.BACK_SPACE);
    valueInput.sendKeys(newValue + '');
    browser.sleep(1000);


    intervalInput.sendKeys(protractor.Key.BACK_SPACE, protractor.Key.BACK_SPACE);
    intervalInput.sendKeys(newInterval + '');
    browser.sleep(1000);

    okButton = element(by.id('okButton'));
    okButton.click();
    browser.sleep(1000);

    const valueUpdated = pumpValue.getText();
    const intervalUpdated = phReadInterval.getText();

    expect(intervalUpdated).toEqual(newInterval);
    expect(valueUpdated).toEqual(newValue);
  });

  it('should leave the old ph settings after clicking Cancel in the dialog', () => {

    pumpValue = element(by.id('pumpValue'));
    phReadInterval = element(by.id('phReadInterval'));
    const oldValue = pumpValue.getText();
    const oldInterval = phReadInterval.getText();

    phSettingsButton.click();
    browser.sleep(1000);

    valueInput = element(by.id('valueInput'));
    intervalInput = element(by.id('intervalInput'));

    const newValue = '2';
    const newInterval = '45';

    valueInput.sendKeys(protractor.Key.BACK_SPACE, protractor.Key.BACK_SPACE);
    valueInput.sendKeys(newValue + '');
    browser.sleep(1000);


    intervalInput.sendKeys(protractor.Key.BACK_SPACE, protractor.Key.BACK_SPACE);
    intervalInput.sendKeys(newInterval + '');
    browser.sleep(1000);

    cancelButton = element(by.id('cancelButton'));
    cancelButton.click();
    browser.sleep(1000);

    const valueUpdated = pumpValue.getText();
    const intervalUpdated = phReadInterval.getText();

    expect(intervalUpdated).toEqual(oldInterval);
    expect(valueUpdated).toEqual(oldValue);
  });
});
