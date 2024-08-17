const CoolingTypeStrategy = require('./CoolingTypeStrategy');

class PassiveCoolingStrategy extends CoolingTypeStrategy {
  classifyTemperature(temperatureInC) {
    const lowerLimit = 0;
    const upperLimit = 35;
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

module.exports = PassiveCoolingStrategy;
