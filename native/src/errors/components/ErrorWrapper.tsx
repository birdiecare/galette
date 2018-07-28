import React, {Component} from 'react'
import {ListView, View, Text, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ReportedError } from "../types";
import { dismissError, reportError } from "../actions";
import ErrorMessage from "./ErrorMessage";
import { reportedErrors } from "../store";

type Props = {
  children: any;
  errors: ReportedError[];
  style?: any;
  channel?: string;
  floating?: boolean;

  dismissError: (identifier: string) => void;
  reportError: (error: Error) => void;
  renderError?: (error: Error, onPress: () => void) => any;
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
    const onPress = () => {
      this.props.dismissError(error.identifier);
    };

    if (this.props.renderError) {
      return this.props.renderError(error, onPress);
    }

    return (
      <ErrorMessage reportedError={error} onPress={onPress} />
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
    bottom: 0
  }
})

export default connect((state, props) => {
  return {
    errors: reportedErrors(state, props.channel),
  }
}, dispatch => bindActionCreators({
  dismissError,
  reportError,
}, dispatch))(ErrorWrapper);
