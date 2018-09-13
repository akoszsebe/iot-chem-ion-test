import {browser, by, element, protractor} from 'protractor';
describe('Experiment Component', () => {

  let stopJobButton, addJobButton, tempSettingsButton, ionSettingsButton, conductivitySettingsButton;
  let valueInput, intervalInput, okButton, cancelButton;
  let pumpValue, phReadInterval;

  beforeEach(() => {
    browser.get('/experiment');
    browser.ignoreSynchronization = true;

    stopJobButton = element(by.id('stopJobButton'));
    addJobButton = element(by.id('addJobButton'));
    tempSettingsButton = element(by.id('tempSettingsButton'));
    ionSettingsButton = element(by.id('ionSettingsButton'));
    conductivitySettingsButton = element(by.id('conductivitySettingsButton'));

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

      expect(conductivitySettingsButton.isPresent());
      expect(conductivitySettingsButton.isDisplayed());
      expect(conductivitySettingsButton.isEnabled());
      
      expect(ionSettingsButton.isPresent());
      expect(ionSettingsButton.isDisplayed());
      expect(ionSettingsButton.isEnabled());
    });
    it('should display a specific dialog when pressing the temp settings button', () => {

      tempSettingsButton.click();
      browser.sleep(1000);
  
      intervalInput = element(by.id('intervalInput'));
      cancelButton = element(by.id('cancelButton'));
      okButton = element(by.id('okButton'));
  
      expect(intervalInput.isDisplayed());
      expect(okButton.isDisplayed());
      expect(okButton.isEnabled());
      expect(cancelButton.isDisplayed());
      expect(cancelButton.isEnabled());
    });

    it('should display a specific dialog when pressing the ion settings button', () => {

      ionSettingsButton.click();
      browser.sleep(1000);
  
      intervalInput = element(by.id('intervalInput'));
      cancelButton = element(by.id('cancelButton'));
      okButton = element(by.id('okButton'));
  
      expect(intervalInput.isDisplayed());
      expect(okButton.isDisplayed());
      expect(okButton.isEnabled());
      expect(cancelButton.isDisplayed());
      expect(cancelButton.isEnabled());
    });

    it('should display a specific dialog when pressing the conductivity settings button', () => {

      conductivitySettingsButton.click();
      browser.sleep(1000);
  
      intervalInput = element(by.id('intervalInput'));
      cancelButton = element(by.id('cancelButton'));
      okButton = element(by.id('okButton'));
  
      expect(intervalInput.isDisplayed());
      expect(okButton.isDisplayed());
      expect(okButton.isEnabled());
      expect(cancelButton.isDisplayed());
      expect(cancelButton.isEnabled());
    });
  
});
