import { currentRoute } from "../functions";

test('it gets the current route from a stack', () => {
  const navigation = {"key":"StackRouterRoot","isTransitioning":false,"index":1,"routes":[{"routeName":"Authentication","key":"id-1530096560424-0"},{"key":"id-1530096560424-3","isTransitioning":false,"index":2,"routes":[{"routeName":"Eula","key":"id-1530096560424-1"},{"routes":[{"key":"TravelList","routeName":"TravelList"},{"key":"TravelExplore","routeName":"TravelExplore"}],"index":0,"isTransitioning":false,"routeName":"Travels","key":"id-1530096560424-2"},{"routeName":"TravelCreate","key":"id-1530096560424-4"}],"routeName":"MainNavigator"}]};

  const route = currentRoute(navigation);

  expect(route).toEqual({
    "routeName":"TravelCreate",
    "key":"id-1530096560424-4"
  });
});

test('it gets the route after a back action', () => {
  const navigation = {"key":"StackRouterRoot","isTransitioning":false,"index":1,"routes":[{"routeName":"Authentication","key":"id-1530096560424-0"},{"key":"id-1530096560424-3","isTransitioning":false,"index":1,"routes":[{"routeName":"Eula","key":"id-1530096560424-1"},{"routes":[{"key":"TravelList","routeName":"TravelList"},{"key":"TravelExplore","routeName":"TravelExplore"}],"index":0,"isTransitioning":false,"routeName":"Travels","key":"id-1530096560424-2"}],"routeName":"MainNavigator"}]};

  const route = currentRoute(navigation);

  expect(route).toEqual({
    "key":"TravelList",
    "routeName":"TravelList"
  });
});
