const AlertStrategy = require('./AlertStrategy');

class ControllerAlertStrategy extends AlertStrategy {
  sendAlert(breachType) {
    const header = 0xfeed;
    console.log(`${header}, ${breachType}`);
  }
}

module.exports = ControllerAlertStrategy;
