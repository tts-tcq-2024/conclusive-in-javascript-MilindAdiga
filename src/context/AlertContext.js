class AlertContext {
  constructor(alertStrategy) {
    this.alertStrategy = alertStrategy;
  }

  sendAlert(breachType) {
    this.alertStrategy.sendAlert(breachType);
  }
}

module.exports = AlertContext;
