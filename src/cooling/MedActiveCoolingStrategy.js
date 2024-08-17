const CoolingTypeStrategy = require('./CoolingTypeStrategy');

class MedActiveCoolingStrategy extends CoolingTypeStrategy {
  classifyTemperature(temperatureInC) {
    const lowerLimit = 0;
    const upperLimit = 40;
    return this.inferBreach(temperatureInC, lowerLimit, upperLimit);
  }

  inferBreach(value, lowerLimit, upperLimit) {
    if (value < lowerLimit) {
      return 'TOO_LOW';
    }
    if (value > upperLimit) {
      return 'TOO_HIGH';
    }
    return 'NORMAL';
  }
}

module.exports = MedActiveCoolingStrategy;
