import React from "react";
import renderer from "react-test-renderer";
import { Text, ScrollView } from "react-native";
import ScrollableCollection from "../../../src/collection/components/ScrollableCollection";
import Collection from "../../../src/collection/Collection";

const noop = () => {};
const renderRow = () => <Text>Row</Text>;

test("it displays only one loading indicator on the first page", () => {
  const collection = new Collection({
    items: [{ foo: "bar" }],
    loading: true,
    up_to_page: 1,
    total_items: 10
  });

  const tree = renderer
    .create(
      <ScrollableCollection
        onRefresh={noop}
        renderRow={renderRow}
        collection={collection}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("it displays the bottom loading indicator when more than one page has been loaded", () => {
  const collection = new Collection({
    items: [{ foo: "bar" }, { foo: "baz" }],
    loading: true,
    up_to_page: 2,
    total_items: 10
  });

  const tree = renderer
    .create(
      <ScrollableCollection
        onRefresh={noop}
        renderRow={renderRow}
        collection={collection}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("passes a testID prop down to the ScrollView component", () => {
  const collection = new Collection({
    items: [{ foo: "bar" }],
    loading: true,
    up_to_page: 1,
    total_items: 10
  });

  const tree = renderer.create(
    <ScrollableCollection
      testID="test-id"
      onRefresh={noop}
      renderRow={renderRow}
      collection={collection}
    />
  );

  const scrollView = tree.root.findByType(ScrollView);
  expect(scrollView.props.testID).toBe("test-id");
});
