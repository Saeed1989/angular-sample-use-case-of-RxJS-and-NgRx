/**
 * Functions of this class converts data form one form to another
 */

import { ErrorMessages } from "../constants/error-messages.constant";

export class ConvertUtil {
  /**
   * Converts error to error message
   * @param err error object
   */
  public static errorToErrorMsg(err: any): string {
    console.error(err);
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return ErrorMessages.UNKNOWN;
    } else {
      // The backend returned an unsuccessful response code.
      // Convert the response code to suitabe error message.
      switch (err.status) {
        case 404:
          return ErrorMessages.ERROR_404;
        case 409:
          return ErrorMessages.ERROR_409;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
        case 506:
        case 507:
        case 508:
        case 509:
        case 510:
        case 511:
          return ErrorMessages.ERROR_5xx;
        default:
          return ErrorMessages.UNKNOWN;
      }
    }
  }
}
