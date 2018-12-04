export type ActionCreator<A extends any[], R extends any> = ((...args: A) => R & {
  type: string;
});

export type ActionCreatorWithType<A extends any[], R extends any> = ActionCreator<A, R> & {
  type: string;
}

export default function typedActionCreatorFactory<A extends any[], R extends any>(type: string, resolver: (...args: A) => R) : ActionCreatorWithType<A, R>
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