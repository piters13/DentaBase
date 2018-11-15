import { environment } from './../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

export function markAsTouchedDeep(formGroup: FormGroup): void {
  formGroup.markAsTouched();
  Object.values(formGroup.controls).forEach(control => {
    if ('controls' in control) {
      markAsTouchedDeep(control as FormGroup);
    } else {
      control.markAsTouched();
    }
  });
}

export function createApiPath(...s: (string | number)[]): string {
  return [environment.apiUrl, ...s].filter(x => x !== '').join('/');
}

export function buildOAuthHeader(): HttpHeaders {
  return new HttpHeaders({
    Authorization:
      'Basic ' + btoa(`${environment.oAuthConfig.id}:${environment.oAuthConfig.secret}`),
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}

export function createDateAsUTC(date): string {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ),
  ).toISOString();
}

export function normalizeDateISOString(date: string): string {
  return date && new Date(date + 'Z').toISOString();
}

export function randomId(): number {
  return Math.floor(Math.random() * 1000000000);
}

export const noop = () => null;
