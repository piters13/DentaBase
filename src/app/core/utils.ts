import { FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
// noinspection TypeScriptCheckImport
import * as sha1 from 'sha1';
import { prop, values } from 'ramda';

export function createApiPath(...s: (string | number)[]): string {
  return [environment.apiUrl, ...s].filter(x => x !== '').join('/');
}

export const noop = () => null;

export const hash = (v: string): string => sha1(v) as string;

export const trackById = prop('id');
