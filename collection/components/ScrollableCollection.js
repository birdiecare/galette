import React, { Component } from 'react'
import {RefreshControl, ScrollView} from "react-native";
import Collection from "./Collection";
import InfiniteScrollView from "../../infinite-scroll-view/InfiniteScrollView";
import PropTypes from "prop-types";

export default class ScrollableCollection extends Component
{
    static propTypes = {
        ...Collection.propTypes,

        onRefresh: PropTypes.func.isRequired,

        header: PropTypes.any,
    };

    static defaultProps = {
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
                        title="Pull to refresh"
                        tintColor="#fff"
                        titleColor="#fff" />
                }
                isLoading={collection.isLoading()}
                canLoadMore={collection.hasMore()}
                distanceToLoadMore={100}
                onLoadMoreAsync={() => {
                    this.props.onRefresh(collection.getPage() + 1);
                }}>

                {this.props.header}

                <Collection {...this.props} />
            </InfiniteScrollView>
        )
    }
}
