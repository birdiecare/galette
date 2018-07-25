import React from 'react';
import renderer from 'react-test-renderer';
import connectEntity from "../../src/loaded-entity/connectEntity";
import configureStore from 'redux-mock-store' //ES6 modules
import { loadUser } from "./support/actions";
import { SimpleComponentExpectingAUserEntity } from "./support/components";

const middlewares = []
const mockStore = configureStore(middlewares)

test('it displays a loading indicator and dispatches the action if entity was not yet loaded', () => {
  const initialState = { users: {} }
  const store = mockStore(initialState)
  const WrappedComponent = connectEntity(SimpleComponentExpectingAUserEntity, {
    property: 'user',
    loadEntityAction: loadUser,
    entitySelector: (state, username) => state.users[username],
    identifierFromPropsResolver: props => props.username
  })

  const tree = renderer.create(
    <WrappedComponent username="sam" store={store}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
  expect(store.getActions()).toEqual([
    loadUser('sam'),
  ]);
});

test('it renders the component with the right property', () => {
  const initialState = {
    users: {
      sam: {
        name: 'Samuel Roze'
      }
    }
  };

  const store = mockStore(initialState)
  const WrappedComponent = connectEntity(SimpleComponentExpectingAUserEntity, {
    property: 'user',
    loadEntityAction: loadUser,
    entitySelector: (state, username) => state.users[username],
    identifierFromPropsResolver: props => props.username
  })

  const tree = renderer.create(
    <WrappedComponent username="sam" store={store}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
  expect(store.getActions()).toEqual([]);
})
