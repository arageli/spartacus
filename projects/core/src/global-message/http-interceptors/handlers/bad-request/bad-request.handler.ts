import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorModel } from '../../../../model/misc.model';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable({
  providedIn: 'root',
})
export class BadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleBadPassword(request, response);
    this.handleBadLoginResponse(request, response);
    this.handleBadCartRequest(request, response);
    this.handleValidationError(request, response);
  }

  protected handleBadPassword(
    request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    if (
      response.url?.includes(OAUTH_ENDPOINT) &&
      response.error?.error === 'invalid_grant' &&
      request.body?.get('grant_type') === 'password'
    ) {
      this.globalMessageService.add(
        {
          key: 'httpHandlers.badRequestPleaseLoginAgain',
          params: {
            errorMessage:
              response.error.error_description || response.message || '',
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
  }

  protected handleBadLoginResponse(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ) {
    this.getErrors(response)
      .filter(error => error.type === 'PasswordMismatchError')
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.badRequestOldPasswordIncorrect' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected handleValidationError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter(e => e.type === 'ValidationError')
      .forEach(error => {
        this.globalMessageService.add(
          {
            key: `httpHandlers.validationErrors.${error.reason}.${error.subject}`,
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected handleBadCartRequest(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter(e => e.subjectType === 'cart' && e.reason === 'notFound')
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.cartNotFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      error => error.type !== 'JaloObjectNoLongerValidError'
    );
  }
}
