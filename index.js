import fetch, { Headers } from 'node-fetch';

import { GenericError } from './utils/errors.js';

const errorCheck = (from, to, userId, password) => {
  if (!userId || !password) {
    throw new GenericError({
      errType: 'INVALID_CREDENTIALS',
      errMsg: 'Invalid userId and password provided, check the credentials again'
    })
  }
  if (!from) throw new GenericError({
    errType: 'INVALID_FROM',
    errMsg: 'Invalid From Number'
  })
  if (!to) throw new GenericError({
    errType: 'INVALID_TO',
    errMsg: 'Invalid To Number'
  })
}

const gupShupSMSBaseURL = 'https://enterprise.smsgupshup.com/GatewayAPI/rest';
const twilioSMSBaseURL = (userId) => `https://api.twilio.com/2010-04-01/Accounts/${userId}/Messages.json`;

export class SMS {
  constructor({ userId, password, provider, from } = {}) {
    this.userId = userId;
    this.password = password;
    this.provider = provider;
    this.from = from;
  }

  sendSMS({
    provider = this.provider,
    from = this.from,
    to,
    message = [],
    userId = this.userId,
    password = this.password
  } = {}) {
    if (provider !== this.provider && (userId === this.userId || password === this.password)) {
      throw new GenericError({
        errType: 'INVALID_CREDENTIALS',
        errMsg: 'Provider has changed but the credentials have not, if you\'re using the same creds in multiple places, please stop. Get some help.'
      })
    }
    let encodedMessage;
    errorCheck(from, to, userId, password);
    if (typeof message !== 'string') {
      if (message[0]) {
        encodedMessage = message.reduce(
          (interimMessage, line, index) => `${interimMessage}${encodeURIComponent(line)}${index === message.length - 1 ? '' : '%0A'}`
          , '');
      } else {
        encodedMessage = ''
      }
    } else {
      message = encodeURIComponent(message);
    }
    switch (provider) {
      case 'gupshup': return fetch(`${gupShupSMSBaseURL}?method=SendMessage&send_to=${to}&msg=${encodedMessage}&msg_type=TEXT&userid=${userId}&auth_scheme=plain&password=${password}&v=1.1&format=json`).then(result => result.json());
      case 'twilio': const headers = new Headers();
        const auth = Buffer.from(`${userId}:${password}`);
        headers.append('Authorization', 'Basic ' + auth.toString('base64'));
        return fetch(twilioSMSBaseURL(userId), { method: 'POST', headers, body: { Body: encodedMessage, From: encodeURIComponent(from), To: encodeURIComponent(to) } }).then(response => response.json());
      default: throw new GenericError({
        errType: 'PROVIDER_ERR',
        errMsg: 'Invalid provider',
        additionalDetails: 'If you would like to see this provider integrated, please raise an issue on https://github.com/ParadoxInfinite/nodetifications/issues/.'
      });
    }
  }
}

export default {
  SMS
};