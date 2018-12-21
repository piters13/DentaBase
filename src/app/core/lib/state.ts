import { StateContext } from '@ngxs/store';
import { Transformer } from '@app/core/lib/function';

export const overState = <T>(fn: Transformer<T>) => (ctx: StateContext<T>): T =>
  ctx.setState(fn(ctx.getState()));
