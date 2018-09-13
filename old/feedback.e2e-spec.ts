import {browser, by, element} from 'protractor';
describe('Feedback Component', () => {

  let sendButton, fromField, messageBox, response;

  beforeEach(() => {
    browser.get('/feedback');

    sendButton = element(by.id('sendButton'));
    fromField = element(by.id('fromField'));
    messageBox = element(by.id('messageBox'));
    response = element(by.id('response'));
    browser.sleep(1000);
  });

  it('should display the form correctly at load', () => {

    expect(response.isPresent());
    expect(response.getText()).toEqual('');

    expect(fromField.isPresent());
    expect(fromField.isDisplayed());
    expect(fromField.isEnabled()).toBe(false);

    expect(messageBox.isPresent());
    expect(messageBox.isDisplayed());
    expect(messageBox.isEnabled()).toBe(true);
    expect(messageBox.getText()).toEqual('');

    expect(sendButton.isPresent());
    expect(sendButton.isDisplayed());
    expect(sendButton.isEnabled()).toBe(true);
    expect(sendButton.getText()).toEqual('Send');
  });

  it('should display thank you message and clear the messagebox after submit', () => {

    const testMessage = 'this is a test feedback';
    messageBox.sendKeys(testMessage);
    expect(messageBox.getAttribute('value')).toEqual(testMessage);
    browser.sleep(1000);
    sendButton.click();
    browser.sleep(1000);
    expect(messageBox.getAttribute('value')).toEqual('');
    expect(response.getText()).toEqual('Thank you for your feedback');
  });


});
