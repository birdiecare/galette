import React, {Component} from 'react'
import {ListView, View, Text, StyleSheet} from "react-native";
import { ReportedError } from "../types";
import { dismissError, reportError } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ErrorMessage from "./ErrorMessage";
import { reportedErrors } from "../selectors";

type Props = {
  children: any;
  errors: ReportedError[];
  style?: any;
  dismissError: (identifier: string) => void;
  reportError: (error: Error) => void;
  renderError?: (error: Error, onPress: () => void) => any;
}

class ErrorWrapper extends Component<Props, {}>
{
  static defaultProps = {
    errorMessageComponent: ErrorMessage,
  }

  componentDidCatch(error, info) {
    this.props.reportError(error);
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.props.errors.map((error, index) => (
          <View key={"error-"+index} style={[styles.floatingBottom, {bottom: index * 40}]}>
            {this.renderError(error)}
          </View>
        ))}
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
  floatingBottom: {
    zIndex: 500,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default connect(state => {
  return {
    errors: reportedErrors(state),
  }
}, dispatch => bindActionCreators({
  dismissError,
  reportError,
}, dispatch))(ErrorWrapper);
