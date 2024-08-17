const PassiveCoolingStrategy = require('./cooling/PassiveCoolingStrategy');
const HiActiveCoolingStrategy = require('./cooling/HiActiveCoolingStrategy');
const MedActiveCoolingStrategy = require('./cooling/MedActiveCoolingStrategy');
const ControllerAlertStrategy = require('./alerts/ControllerAlertStrategy');
const EmailAlertStrategy = require('./alerts/EmailAlertStrategy');

function getCoolingStrategy(coolingType) {
  switch(coolingType) {
    case 'PASSIVE_COOLING':
      return new PassiveCoolingStrategy();
    case 'HI_ACTIVE_COOLING':
      return new HiActiveCoolingStrategy();
    case 'MED_ACTIVE_COOLING':
      return new MedActiveCoolingStrategy();
    default:
      throw new Error('Unknown cooling type');
  }
}

function getAlertStrategy(alertTarget) {
  switch(alertTarget) {
    case 'TO_CONTROLLER':
      return new ControllerAlertStrategy();
    case 'TO_EMAIL':
      return new EmailAlertStrategy();
    default:
      throw new Error('Unknown alert target');
  }
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
  const coolingStrategy = getCoolingStrategy(batteryChar.coolingType);
  const breachType = coolingStrategy.classifyTemperature(temperatureInC);
  const alertStrategy = getAlertStrategy(alertTarget);
  alertStrategy.sendAlert(breachType);
}

module.exports = {
  checkAndAlert
};
