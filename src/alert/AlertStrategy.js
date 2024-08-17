class AlertStrategy {
  sendAlert(breachType) {
    throw new Error('This method should be overridden by subclasses');
  }
}

module.exports = AlertStrategy;
