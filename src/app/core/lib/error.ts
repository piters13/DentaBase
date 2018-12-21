import { HttpErrorResponse } from '@angular/common/http';

export const is404 = (err: Error): boolean =>
  err instanceof HttpErrorResponse && err.status === 404;
