const CoolingTypeStrategy = require('./CoolingTypeStrategy');

class PassiveCoolingStrategy extends CoolingTypeStrategy {
  constructor() {
    super(0, 35);  // Passing the specific limits to the parent class
  }
}

module.exports = PassiveCoolingStrategy;
