import {browser, by, element} from 'protractor';
describe('Login Component', () => {

  let loginButton;

  beforeEach(() => {
    browser.get('/login');

    loginButton = element(by.id('loginButton'));
    browser.sleep(1000);

  });

  it('should find the button to login', () => {
    expect(loginButton.isEnabled()).toBe(true);
    expect(loginButton.getText()).toEqual('Login with Facebook');
  });


});
