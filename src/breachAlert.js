function alertBasedOnTarget(alertTarget, breachType) {
  const alertActions = {
    TO_CONTROLLER: sendToController,
    TO_EMAIL: sendToEmail,
  };

  const alertAction = alertActions[alertTarget];
  if (alertAction) {
    alertAction(breachType);
  } else {
    throw new Error('Invalid alert target');
  }
}

function sendToController(breachType) {
  const header = 0xfeed;
  console.log(`${header}, ${breachType}`);
}

function sendToEmail(breachType) {
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

module.exports = {
  alertBasedOnTarget,
  sendToController,
  sendToEmail,
};
