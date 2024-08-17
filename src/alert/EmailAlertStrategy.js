const AlertStrategy = require('./AlertStrategy');

class EmailAlertStrategy extends AlertStrategy {
  sendAlert(breachType) {
    const recepient = 'a.b@c.com';
    const messages = {
      TOO_LOW: 'Hi, the temperature is too low',
      TOO_HIGH: 'Hi, the temperature is too high',
    };

    const message = messages[breachType];
    if (message) {
      console.log(`To: ${recepient}`);
      console.log(message);
    }
  }
}

module.exports = EmailAlertStrategy;
