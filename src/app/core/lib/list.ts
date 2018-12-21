import {
  always,
  append,
  Arity1Fn,
  call,
  cond,
  converge,
  curry,
  defaultTo,
  equals,
  findIndex,
  gte,
  identity,
  ifElse,
  insert,
  length,
  lt,
  map,
  pipe,
  prepend,
  slice,
  T,
  update,
  zipObj,
  isEmpty,
  flatten,
  when,
  propEq,
} from 'ramda';
import { Transformer } from '@app/core/lib/function';

export const defaultToEmptyList: <U>(list: U | null | undefined) => any[] | U = defaultTo([]);

export const shift = curry(
  <A>(to: number, from: number, list: ReadonlyArray<A>): A[] => {
    if (from === to || from < 0 || from >= list.length) {
      return list.slice();
    }

    const output = list.slice();

    if (to < 0) {
      output.unshift(output.splice(from, 1)[0]);
    } else if (to >= list.length) {
      output.push(output.splice(from, 1)[0]);
    } else {
      output.splice(to, 0, output.splice(from, 1)[0]);
    }

    return output;
  },
);

export const updateOrPrepend = <A>(
  predicate: (a: A) => boolean,
  item: A,
): ((list: ReadonlyArray<A>) => A[]) =>
  converge(call, [
    pipe(
      findIndex(predicate),
      ifElse(equals(-1), always(prepend(item)), i => update(i, item)),
    ),
    identity,
  ]);

export const omitFirst: <A>(list: ReadonlyArray<A>) => A[] = slice(1, Infinity);

export const extendedInsert = <A>(position, item): ((list: ReadonlyArray<A>) => A[]) =>
  cond([
    [always(lt(position, 0)), prepend(item)],
    [
      pipe(
        length,
        gte(position),
      ),
      append(item),
    ],
    [T, insert(position, item)],
  ]);

export const objFromKeys = curry((fn: Arity1Fn, keys: ReadonlyArray<string>) =>
  zipObj(keys, map(fn, keys)),
);

export const deepEmpty: <A>(list: ReadonlyArray<A>) => boolean = pipe(
  flatten,
  isEmpty,
);

export const mapById = <A, B>(fn: Transformer<A>, id: B): ((list: ReadonlyArray<A>) => A[]) =>
  map(when(propEq('id', id), fn));
