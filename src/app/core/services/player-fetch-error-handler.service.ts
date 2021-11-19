import { Injectable, ErrorHandler } from '@angular/core';
import { PlayerFetchError } from '../modles/playerFetchError';

@Injectable()
export class PlayerFetchErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    let customError: PlayerFetchError = {
      errorNumber: 200,
      message: (<Error>error).message,
      friendlyMessage: 'An error occurred. Please try again.',
    };

    console.log(customError);
  }

  constructor() {}
}
