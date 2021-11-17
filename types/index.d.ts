export class SMS {
  /**
   * @param {string} userId - User ID to authenticate with the provider
   * @param {string} password - Password to authenticate with the provider
   * @param {string} provider - Provider to send messages from. Currently valid providers: `twilio` and `gupshup`
   * @param {string} from - Number from which to send the SMS, can be changed per request too, @see `SMS.sendSMS`
   */
  constructor({ userId, password, provider, from }: {
    userId: string,
    password: string,
    provider: string,
    from: string
  })

  /**
   * @param {string} provider - Defaults to constructor value, but can give a different `provider` than before, however this makes `userId` and `password` mandatory.
   * @param {string} from - Defaults to constructor value, but can be different than the `from` before.
   * @param {string} to - Mandatory value, recipients's phone number.
   * @param {Array} message - Array of strings, each element is a new line. Blank string(without whitespace) for a blank new line.
   * @param {string} userId - Defaults to constructor value, but mandatory when `provider` is passed and different from constructor.
   * @param {string} password - Defaults to constructor value, but mandatory when `provider` is passed and different from constructor.
   * @returns {Promise} A response promise from the provider, if successful, the response will be in JSON format. Errors need to be handled separately.
   */
  sendSMS({ provider, from, to, message, userId, password }: {
    provider: string,
    from: string,
    to: string,
    message: Array<string>,
    userId: string,
    password: string
  }): Promise<any>
}