class CoolingTypeStrategy {
  classifyTemperature(temperatureInC) {
    throw new Error('This method should be overridden by subclasses');
  }
}

module.exports = CoolingTypeStrategy;
