const Reset = "\x1b[0m"
const Bright = "\x1b[1m"

const FgWhite = "\x1b[37m"

const BgRed = "\x1b[41m"

export class GenericError extends Error {
  constructor({
    errType = 'UNKNOWN_ERROR',
    errMsg = 'Unknown error occured',
    additionalDetails = "If you would like to report this to the author, please raise an issue here: https://github.com/ParadoxInfinite/nodetifications/issues/"
  }) {
    super();
    this.name = `${Bright}${BgRed}${FgWhite}${errType}`,
      this.message = `${errMsg}.${Reset}\n${additionalDetails}`
  }
}

export default {
  GenericError
}