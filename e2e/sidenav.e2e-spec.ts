import {browser, by, element} from 'protractor';
describe('Sidenav Component', () => {

  let menuButton, sidenav, closeButton;

  beforeEach(() => {
    browser.get('/login');
    menuButton = element(by.id('menuButton'));
    browser.sleep(1000);
  });

  it('should find the button to open the side navigation', () => {

    expect(menuButton.isPresent());
    expect(menuButton.isDisplayed());
  });

  it('should open the menu when clicking the menu button', () => {

    menuButton.click();
    browser.sleep(1000);
    sidenav = element(by.id('sidenav'));
    expect(sidenav.isDisplayed()).toBe(true);
  });

  it('should close the menu when clicking the close menu button', () => {

    menuButton.click();
    browser.sleep(1000);
    sidenav = element(by.id('sidenav'));
    closeButton = element(by.id('closeMenu'));
    expect(closeButton.isDisplayed()).toBe(true);
    closeButton.click();
    browser.sleep(1000);
    expect(sidenav.isDisplayed()).toBe(false);
  });

  it('should find the experiment menu item', () => {
    browser.ignoreSynchronization = true;
    menuButton.click();
    browser.sleep(1000);
    const experiment = element(by.id('experimentLink'));
    expect(experiment.isPresent());
    expect(experiment.isDisplayed());
    experiment.click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/experiment');
  });

  it('should find the feedback menu item', () => {
    menuButton.click();
    browser.sleep(1000);
    const feedback = element(by.id('feedbackLink'));
    expect(feedback.isPresent());
    expect(feedback.isDisplayed());
    feedback.click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/feedback');
  });

  it('should find the function approximation menu item', () => {
    menuButton.click();
    browser.sleep(1000);
    const approx = element(by.id('ionapproximationLink'));
    expect(approx.isPresent());
    expect(approx.isDisplayed());
    approx.click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/ionapproximation');
  });

  it('should find the calibration menu item', () => {
    menuButton.click();
    browser.sleep(1000);
    const calibration = element(by.id('calibrationLink'));
    expect(calibration.isPresent());
    expect(calibration.isDisplayed());
    calibration.click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/calibration');
  });


  it('should find the reports menu item', () => {
    menuButton.click();
    browser.sleep(1000);
    const reports = element(by.id('reportsLink'));
    expect(reports.isPresent());
    expect(reports.isDisplayed());
    reports.click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/reports');
  });


});
