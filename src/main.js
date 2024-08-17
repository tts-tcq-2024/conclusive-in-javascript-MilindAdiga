const PassiveCoolingStrategy = require('./PassiveCoolingStrategy');
const HiActiveCoolingStrategy = require('./HiActiveCoolingStrategy');
const MedActiveCoolingStrategy = require('./MedActiveCoolingStrategy');
const ControllerAlertStrategy = require('./ControllerAlertStrategy');
const EmailAlertStrategy = require('./EmailAlertStrategy');
const CoolingContext = require('./CoolingContext');
const AlertContext = require('./AlertContext');

function getCoolingStrategy(coolingType) {
  const strategies = {
    PASSIVE_COOLING: new PassiveCoolingStrategy(),
    HI_ACTIVE_COOLING: new HiActiveCoolingStrategy(),
    MED_ACTIVE_COOLING: new MedActiveCoolingStrategy(),
  };

  return strategies[coolingType] || null;
}

function getAlertStrategy(alertTarget) {
  const strategies = {
    TO_CONTROLLER: new ControllerAlertStrategy(),
    TO_EMAIL: new EmailAlertStrategy(),
  };

  return strategies[alertTarget] || null;
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
  const coolingStrategy = getCoolingStrategy(batteryChar.coolingType);
  if (!coolingStrategy) {
    throw new Error('Invalid cooling type');
  }

  const coolingContext = new CoolingContext(coolingStrategy);
  const breachType = coolingContext.classifyTemperature(temperatureInC);

  const alertStrategy = getAlertStrategy(alertTarget);
  if (!alertStrategy) {
    throw new Error('Invalid alert target');
  }

  const alertContext = new AlertContext(alertStrategy);
  alertContext.sendAlert(breachType);
}

module.exports = { checkAndAlert };
