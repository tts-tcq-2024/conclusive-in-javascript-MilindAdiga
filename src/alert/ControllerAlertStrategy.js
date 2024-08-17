class ControllerAlertStrategy {
  sendAlert(breachType) {
    const header = 0xfeed;
    console.log(`${header}, ${breachType}`);
  }
}

module.exports = ControllerAlertStrategy;
