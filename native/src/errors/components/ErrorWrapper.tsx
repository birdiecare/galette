import React, {Component} from 'react'
import {View, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ErrorMessage from "./ErrorMessage";
import { reportedErrors } from "../store";
import {store, ReportedError} from "@galette/core";

const {actions: {reportError}} = store;

type Props = {
  children: any;
  errors: ReportedError[];
  style?: any;
  channel?: string;
  floating?: boolean;
  retryEnabled?: boolean;

  reportError: (error: Error) => void;
  renderError?: (error: Error) => React.ComponentType;
}

class ErrorWrapper extends Component<Props, {}>
{
  static defaultProps = {
    floating: true,
  }

  componentDidCatch(error, info) {
    this.props.reportError(error);
  }

  render() {
    const errorsContainerStyles = [
      styles.forwardContainer,
    ];

    if (this.props.floating) {
      errorsContainerStyles.push(styles.floatingBottomContainer);
    }

    return (
      <View style={this.props.style}>
        {this.props.errors.length > 0 && (
          <View style={errorsContainerStyles}>
            {this.props.errors.map((error, index) => (
              <View key={"error-"+index}>
                {this.renderError(error)}
              </View>
            ))}
          </View>
        )}
        {this.props.children}
      </View>
    );
  }

  renderError(error) {
    if (this.props.renderError) {
      return this.props.renderError(error);
    }

    return (
      <ErrorMessage
        reportedError={error}
        retryEnabled={this.props.retryEnabled} />
    )
  }
}

const styles = StyleSheet.create({
  forwardContainer: {
    zIndex: 500
  },
  floatingBottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
})

export default connect((state, props) => {
  return {
    errors: reportedErrors(state, props.channel),
  }
}, dispatch => bindActionCreators({
  reportError,
}, dispatch))(ErrorWrapper);
