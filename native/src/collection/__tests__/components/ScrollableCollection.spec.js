import React from 'react';
import renderer from 'react-test-renderer';
import ScrollableCollection from '../../components/ScrollableCollection'
import {Text} from "react-native";
import Collection from "../../Collection";

test('it displays only one loading indicator on the first page', () => {
  const collection = new Collection({
    items: [
      {foo: 'bar'},
    ],
    loading: true,
    up_to_page: 1,
    total_items: 10,
  });

  const tree = renderer.create(
    <ScrollableCollection
      onRefresh={() => {}}
      renderRow={() => <Text>Row</Text>}
      collection={collection}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('it displays the bottom loading indicator when more than one page has been loaded', () => {
  const collection = new Collection({
    items: [
      {foo: 'bar'},
      {foo: 'baz'},
    ],
    loading: true,
    up_to_page: 2,
    total_items: 10,
  });

  const tree = renderer.create(
    <ScrollableCollection
      onRefresh={() => {}}
      renderRow={() => <Text>Row</Text>}
      collection={collection}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
