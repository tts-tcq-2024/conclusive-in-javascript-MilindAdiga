const COOLING_LIMITS = {
  PASSIVE_COOLING: { lowerLimit: 0, upperLimit: 35 },
  HI_ACTIVE_COOLING: { lowerLimit: 0, upperLimit: 45 },
  MED_ACTIVE_COOLING: { lowerLimit: 0, upperLimit: 40 },
};

function inferBreach(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) {
    return 'TOO_LOW';
  }
  if (value > upperLimit) {
    return 'TOO_HIGH';
  }
  return 'NORMAL';
}

function classifyTemperatureBreach(coolingType, temperatureInC) {
  const { lowerLimit, upperLimit } = COOLING_LIMITS[coolingType] || {};
  if (lowerLimit === undefined || upperLimit === undefined) {
    throw new Error('Invalid cooling type');
  }
  return inferBreach(temperatureInC, lowerLimit, upperLimit);
}

module.exports = {
  inferBreach,
  classifyTemperatureBreach,
};
