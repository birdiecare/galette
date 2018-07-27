type ActionCreator = (...args : any[]) => any;
type ActionCreatorWithType = ActionCreator & {
  type: string;
}

export default function typedActionCreatorFactory(type: string, resolver: () => any) : ActionCreatorWithType
{
  const creator : ActionCreator = (...args : any[]) => {
    const properties = resolver.apply(null, args);

    return {
      type,
      ...properties
    }
  }

  return Object.assign(creator, {
    type
  });
}
