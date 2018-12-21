import { map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export interface ListWrapper<T> {
  items: T[];
}

export function unwrap<T>(): OperatorFunction<ListWrapper<T>, T[]> {
  return map(unwrapItems);
}

function unwrapItems<T>(wrapper: ListWrapper<T>): T[] {
  return wrapper.items;
}

export function wrap<T>(collection: T[]): ListWrapper<T> {
  return { items: collection };
}
