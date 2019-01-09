import { FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
// noinspection TypeScriptCheckImport
import * as sha1 from 'sha1';
import { prop, values } from 'ramda';

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

export const hash = (v: string): string => sha1(v) as string;

export const trackById = prop('id');

export function updateValueAndValidityDeep(formGroup: FormGroup): void {
  formGroup.updateValueAndValidity({ onlySelf: true });
  values(formGroup.controls).forEach(control => {
    if ('controls' in control) {
      updateValueAndValidityDeep(control as FormGroup);
    } else {
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
}
