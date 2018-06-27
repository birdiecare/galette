// Get the current route from the navigation state.
export const currentRoute = (navigation) => {
  if (navigation.index !== undefined && navigation.routes) {
    return currentRoute(navigation.routes[navigation.index]);
  }

  return navigation;
};
