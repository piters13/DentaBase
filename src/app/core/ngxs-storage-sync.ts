import { none, some } from 'fp-ts/lib/Option';

export function deserialize(val: string): any {
  const obj = JSON.parse(val);

  if (obj.hasOwnProperty('_tag') && obj._tag === 'Some') {
    return some(obj.value);
  } else if (obj.hasOwnProperty('_tag') && obj._tag === 'None') {
    return none;
  }

  return obj;
}
