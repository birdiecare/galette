import React, { Component } from 'react';
import {ScrollView, ScrollViewProperties, View} from 'react-native';
import ScrollableMixin from 'react-native-scrollable-mixin';
import cloneReferencedElement from 'react-clone-referenced-element';
import DefaultLoadingIndicator from './DefaultLoadingIndicator';

type Props = ScrollViewProperties & {
  onLoadMoreAsync: () => void | Promise<void>;

  displayLoading?: boolean;
  renderLoadingErrorIndicator?: (options: any) => any;
  renderLoadingIndicator?: () => any;
  renderScrollComponent?: (props : any) => any;
  onScroll?: (event : any) => void;
  canLoadMore?: boolean | (() => boolean);
  distanceToLoadMore?: number;
  onLoadError?: (e : Error) => void;
  isLoading?: boolean;
};

type State = {
  isDisplayingError: boolean;
  isLoading?: boolean;
};

export default class InfiniteScrollView extends Component<Props, State> {
  static defaultProps = {
    distanceToLoadMore: 1500,
    canLoadMore: false,
    isLoading: false,
    scrollEventThrottle: 100,
    displayLoading: true,
    renderLoadingIndicator: () => <DefaultLoadingIndicator/>,
    renderLoadingErrorIndicator: () => <View/>,
    renderScrollComponent: props => <ScrollView {...props} />,
  };

  private _scrollComponent;

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDisplayingError: false,
    };

    this._handleScroll = this._handleScroll.bind(this);
    this._loadMoreAsync = this._loadMoreAsync.bind(this);
  }

  getScrollResponder() {
    return this._scrollComponent.getScrollResponder();
  }

  setNativeProps(nativeProps) {
    this._scrollComponent.setNativeProps(nativeProps);
  }

  render() {
    let statusIndicator;

    if (this.state.isDisplayingError) {
      statusIndicator = React.cloneElement(
        this.props.renderLoadingErrorIndicator(
          {onRetryLoadMore: this._loadMoreAsync}
        ),
        {key: 'loading-error-indicator'},
      );
    } else if (this._isLoading() && this.props.displayLoading) {
      statusIndicator = React.cloneElement(
        this.props.renderLoadingIndicator(),
        {key: 'loading-indicator'},
      );
    }

    let { renderScrollComponent, ...props } = this.props;

    Object.assign(props, {
      onScroll: this._handleScroll,
      children: [this.props.children, statusIndicator],
    });

    return cloneReferencedElement(renderScrollComponent(props), {
      ref: component => {
        this._scrollComponent = component;
      },
    });
  }

  _handleScroll(event) {
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }

    if (this._shouldLoadMore(event)) {
      this._loadMoreAsync().catch(error => {
        console.error('Unexpected error while loading more content:', error);
      });
    }
  }

  _shouldLoadMore(event) {
    let canLoadMore = (typeof this.props.canLoadMore === 'function') ?
      this.props.canLoadMore() :
      this.props.canLoadMore;

    return !this._isLoading() &&
      canLoadMore &&
      !this.state.isDisplayingError &&
      this._distanceFromEnd(event) < this.props.distanceToLoadMore;
  }

  async _loadMoreAsync() {
    if (this._isLoading() && __DEV__) {
      throw new Error('_loadMoreAsync called while isLoading is true');
    }

    try {
      this.setState({isDisplayingError: false, isLoading: true});
      await this.props.onLoadMoreAsync();
    } catch (e) {
      if (this.props.onLoadError) {
        this.props.onLoadError(e);
      }
      this.setState({isDisplayingError: true});
    } finally {
      this.setState({isLoading: false});
    }
  }

  _distanceFromEnd(event) {
    let {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement,
    } = event.nativeEvent;

    let contentLength;
    let trailingInset;
    let scrollOffset;
    let viewportLength;
    if (this.props.horizontal) {
      contentLength = contentSize.width;
      trailingInset = contentInset.right;
      scrollOffset = contentOffset.x;
      viewportLength = layoutMeasurement.width;
    } else {
      contentLength = contentSize.height;
      trailingInset = contentInset.bottom;
      scrollOffset = contentOffset.y;
      viewportLength = layoutMeasurement.height;
    }

    return contentLength + trailingInset - scrollOffset - viewportLength;
  }

  _isLoading() {
    return this.props.isLoading || this.state.isLoading;
  }
}

Object.assign(InfiniteScrollView.prototype, ScrollableMixin);
