import React, { Component } from 'react'
import {RefreshControl, ScrollView} from "react-native";
import CollectionComponent, { Props as CollectionComponentProps } from "./CollectionComponent";
import InfiniteScrollView from "../../infinite-scroll-view/InfiniteScrollView";
import Collection from "../Collection";

type Props = CollectionComponentProps & {
    collection: Collection;
    onRefresh: (page?: number) => void;
    header?: Component;
    numberOfItemsForFullPage?: number;
}

export default class ScrollableCollection extends Component<Props, {}>
{
    static defaultProps = {
        numberOfItemsForFullPage: 10,
        header: null,
    };

    componentWillMount() {
        this.props.onRefresh();
    }

    render() {
        let { collection } = this.props;

        return (
            <InfiniteScrollView
                style={{flex: 1}}
                refreshControl={
                    <RefreshControl
                        refreshing={collection.isLoading()}
                        onRefresh={() => this.props.onRefresh(1)}
                        title="Loading..."
                        tintColor="#fff"
                        titleColor="#fff" />
                }
                isLoading={collection.isLoading()}
                canLoadMore={collection.hasMore()}
                displayLoading={this._shouldDisplayBottomLoading(collection)}
                distanceToLoadMore={100}
                onLoadMoreAsync={() => {
                    this.props.onRefresh(collection.getPage() + 1);
                }}>

                {this.props.header}

                <CollectionComponent {...this.props} />
            </InfiniteScrollView>
        )
    }

    _shouldDisplayBottomLoading(collection) {
        return collection.getPage() > 1 || collection.items().length > this.props.numberOfItemsForFullPage;
    }
}
