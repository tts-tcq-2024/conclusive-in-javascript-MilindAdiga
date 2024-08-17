const PassiveCoolingStrategy = require('./cooling/PassiveCoolingStrategy');
const HiActiveCoolingStrategy = require('./cooling/HiActiveCoolingStrategy');
const MedActiveCoolingStrategy = require('./cooling/MedActiveCoolingStrategy');
const ControllerAlertStrategy = require('./alert/ControllerAlertStrategy');
const EmailAlertStrategy = require('./alert/EmailAlertStrategy');

const coolingStrategies = {
  'PASSIVE_COOLING': PassiveCoolingStrategy,
  'HI_ACTIVE_COOLING': HiActiveCoolingStrategy,
  'MED_ACTIVE_COOLING': MedActiveCoolingStrategy,
};

function getCoolingStrategy(coolingType) {
  const StrategyClass = coolingStrategies[coolingType];
  if (!StrategyClass) {
    throw new Error('Unknown cooling type');
  }
  return new StrategyClass();
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
