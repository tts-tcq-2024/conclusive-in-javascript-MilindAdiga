const CoolingTypeStrategy = require('./CoolingTypeStrategy');

class HiActiveCoolingStrategy extends CoolingTypeStrategy {
  constructor() {
    super(0, 45);  // Passing the specific limits to the parent class
  }
}

module.exports = HiActiveCoolingStrategy;
