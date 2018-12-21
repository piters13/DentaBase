import { pipe, Pred } from 'ramda';
import { Tuple } from 'fp-ts/lib/Tuple';

export const asTuple = <A, B>(list: (A | B)[]): Tuple<A | B, A | B> => new Tuple(list[0], list[1]);

export const fst = <A, B>(x: Tuple<A, B>) => x.fst;
export const snd = <A, B>(x: Tuple<A, B>) => x.snd;

export const ifFst = (pred: Pred) =>
  pipe(
    fst,
    pred,
  );

export const ifSnd = (pred: Pred) =>
  pipe(
    snd,
    pred,
  );

export const bimap = <A, B, C, D>(f: (a: A) => C, g: (b: B) => D) => (
  tuple: Tuple<A, B>,
): Tuple<C, D> => tuple.bimap(f, g);

export const fold = <A, B, T>(f) => (tuple: Tuple<A, B>): T => f(tuple.fst, tuple.snd);
