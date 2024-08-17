const {expect} = require('chai');
const sinon = require('sinon');
const alerts = require('../src/typewisealert');

describe('Alert System Tests', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleSpy.restore();
  });

  it('sends alert to controller for TOO_HIGH temperature in Hi Active Cooling', () => {
    const batteryChar = {coolingType: 'HI_ACTIVE_COOLING'};
    alerts.checkAndAlert('TO_CONTROLLER', batteryChar, 46);
    expect(consoleSpy.calledWith('65261, TOO_HIGH')).to.be.true;
  });

  it('sends alert to controller for NORMAL temperature in Hi Active Cooling', () => {
    const batteryChar = {coolingType: 'HI_ACTIVE_COOLING'};
    alerts.checkAndAlert('TO_CONTROLLER', batteryChar, 40);
    expect(consoleSpy.calledWith('65261, NORMAL')).to.be.true;
  });

  it('sends email alert for TOO_LOW temperature in Passive Cooling', () => {
    const batteryChar = {coolingType: 'PASSIVE_COOLING'};
    alerts.checkAndAlert('TO_EMAIL', batteryChar, -5);
    expect(consoleSpy.calledWith('To: a.b@c.com')).to.be.true;
    expect(consoleSpy.calledWith('Hi, the temperature is too low')).to.be.true;
  });

  it('sends email alert for TOO_HIGH temperature in Passive Cooling', () => {
    const batteryChar = {coolingType: 'PASSIVE_COOLING'};
    alerts.checkAndAlert('TO_EMAIL', batteryChar, 36);
    expect(consoleSpy.calledWith('To: a.b@c.com')).to.be.true;
    expect(consoleSpy.calledWith('Hi, the temperature is too high')).to.be.true;
  });

  it('sends alert to controller for NORMAL temperature in Med Active Cooling', () => {
    const batteryChar = {coolingType: 'MED_ACTIVE_COOLING'};
    alerts.checkAndAlert('TO_CONTROLLER', batteryChar, 30);
    expect(consoleSpy.calledWith('65261, NORMAL')).to.be.true;
  });
});
