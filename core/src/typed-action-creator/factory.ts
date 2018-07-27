
export default function typedActionCreatorFactory(type: string, resolver: () => any)
{
  const creator = (...args) => {
    const properties = resolver.apply(null, args);

    return {
      type,
      ...properties
    }
  }

  creator.type = type;

  return creator;
}
