class CoolingTypeStrategy {
  constructor(lowerLimit, upperLimit) {
    this.lowerLimit = lowerLimit;
    this.upperLimit = upperLimit;
  }

  classifyTemperature(temperatureInC) {
    return this.inferBreach(temperatureInC);
  }

  inferBreach(value) {
    if (value < this.lowerLimit) {
      return 'TOO_LOW';
    }
    if (value > this.upperLimit) {
      return 'TOO_HIGH';
    }
    return 'NORMAL';
  }
}

module.exports = CoolingTypeStrategy;
