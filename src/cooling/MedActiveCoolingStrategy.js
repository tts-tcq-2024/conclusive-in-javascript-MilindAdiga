const CoolingTypeStrategy = require('./CoolingTypeStrategy');

class MedActiveCoolingStrategy extends CoolingTypeStrategy {
  constructor() {
    super(0, 40);  // Passing the specific limits to the parent class
  }
}

module.exports = MedActiveCoolingStrategy;
