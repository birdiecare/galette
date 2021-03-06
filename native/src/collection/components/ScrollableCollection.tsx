import React, { Component, ReactNode } from "react";
import { RefreshControl, StyleProp, ViewStyle } from "react-native";
import CollectionComponent, {
  Props as CollectionComponentProps
} from "./CollectionComponent";
import InfiniteScrollView from "../../infinite-scroll-view/InfiniteScrollView";
import Collection from "../Collection";

type Props = CollectionComponentProps & {
  collection: Collection;
  onRefresh: (page?: number) => void;
  hideRefreshAnimation?: boolean;
  header?: ReactNode;
  numberOfItemsForFullPage?: StyleProp<ViewStyle>;
  style?: any;
};

export default class ScrollableCollection extends Component<Props, {}> {
  static defaultProps = {
    numberOfItemsForFullPage: 10,
    header: null
  };

  componentDidMount() {
    this.props.onRefresh();
  }

  render() {
    let { collection, hideRefreshAnimation } = this.props;

    return (
      <React.Fragment>
        <InfiniteScrollView
          testID={this.props.testID}
          style={this.props.style || { flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={!hideRefreshAnimation && collection.isLoading()}
              onRefresh={() => this.props.onRefresh(1)}
              title="Loading..."
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          isLoading={collection.isLoading()}
          canLoadMore={collection.hasMore()}
          displayLoading={this._shouldDisplayBottomLoading(collection)}
          distanceToLoadMore={100}
          onLoadMoreAsync={() => {
            this.props.onRefresh(collection.getPage() + 1);
          }}
        >
          {this.props.header}
          <CollectionComponent {...this.props} />
        </InfiniteScrollView>
      </React.Fragment>
    );
  }

  _shouldDisplayBottomLoading(collection) {
    return (
      collection.getPage() > 1 ||
      collection.items().length > this.props.numberOfItemsForFullPage
    );
  }
}
