const { expect } = require('chai');
const sinon = require('sinon');
const typewiseAlert = require('../src/typewisealert');
const EmailAlertStrategy = require('../src/alert/EmailAlertStrategy');
const ControllerAlertStrategy = require('../src/alert/ControllerAlertStrategy');
const CoolingTypeStrategy = require('../src/cooling/CoolingTypeStrategy');

describe('Check and Alert', function () {
  let emailAlertSpy, controllerAlertSpy;

  beforeEach(() => {
    emailAlertSpy = sinon.spy(EmailAlertStrategy.prototype, 'sendAlert');
    controllerAlertSpy = sinon.spy(ControllerAlertStrategy.prototype, 'sendAlert');
  });

  afterEach(() => {
    emailAlertSpy.restore();
    controllerAlertSpy.restore();
  });

  it('should trigger email alert when breach is detected', function () {
    const coolingType = new CoolingTypeStrategy('PASSIVE_COOLING');
    const breachType = coolingType.classifyTemperature(50);

    typewiseAlert.checkAndAlert(new EmailAlertStrategy(), { coolingType: 'PASSIVE_COOLING' }, 50);

    expect(emailAlertSpy.calledOnce).to.be.true;
    expect(emailAlertSpy.calledWith('TOO_HIGH')).to.be.true;
    expect(breachType).to.equal('TOO_HIGH');
  });

  it('should trigger controller alert when breach is detected', function () {
    const coolingType = new CoolingTypeStrategy('HI_ACTIVE_COOLING');
    const breachType = coolingType.classifyTemperature(100); 

    typewiseAlert.checkAndAlert(new ControllerAlertStrategy(), { coolingType: 'HI_ACTIVE_COOLING' }, 100);

    expect(controllerAlertSpy.calledOnce).to.be.true;
    expect(controllerAlertSpy.calledWith('TOO_HIGH')).to.be.true;
    expect(breachType).to.equal('TOO_HIGH');
  });

  it('should not trigger alert when temperature is normal', function () {
    const coolingType = new CoolingTypeStrategy('PASSIVE_COOLING');
    const breachType = coolingType.classifyTemperature(20); 

    typewiseAlert.checkAndAlert(new EmailAlertStrategy(), { coolingType: 'PASSIVE_COOLING' }, 20);

    expect(emailAlertSpy.notCalled).to.be.true;
    expect(breachType).to.equal('NORMAL');
  });

  it('should classify temperature as TOO_LOW when temperature is below the minimum limit', function () {
    const coolingType = new CoolingTypeStrategy('HI_ACTIVE_COOLING');
    const breachType = coolingType.classifyTemperature(-10);

    typewiseAlert.checkAndAlert(new ControllerAlertStrategy(), { coolingType: 'HI_ACTIVE_COOLING' }, -10);

    expect(controllerAlertSpy.calledOnce).to.be.true;
    expect(controllerAlertSpy.calledWith('TOO_LOW')).to.be.true;
    expect(breachType).to.equal('TOO_LOW');
  });
});
