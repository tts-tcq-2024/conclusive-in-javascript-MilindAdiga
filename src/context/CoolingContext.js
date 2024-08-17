class CoolingContext {
  constructor(coolingStrategy) {
    this.coolingStrategy = coolingStrategy;
  }

  classifyTemperature(temperatureInC) {
    return this.coolingStrategy.classifyTemperature(temperatureInC);
  }
}

module.exports = CoolingContext;
