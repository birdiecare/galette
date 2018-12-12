export type TypedAction<R> = R & {
  type: string;
}

export type ActionCreator<A extends any[], R extends any> = ((...args: A) => TypedAction<R>);

export type TypedActionCreator<A extends any[], R extends any> = ActionCreator<A, R> & {
  type: string;
}

export default function typedActionCreatorFactory<A extends any[], R extends any>(type: string, resolver: (...args: A) => R) : TypedActionCreator<A, R>
{
  const actionCreator = (...args: A) => {
    const properties = resolver(...args);
    return Object.assign(properties, {
      type
    })
  }
  return Object.assign(actionCreator, {
    type
  });
}
