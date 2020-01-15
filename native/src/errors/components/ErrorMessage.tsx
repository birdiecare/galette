import React, {Component} from 'react'
import { View, Text, TouchableHighlight, StyleSheet} from "react-native";
import { connect } from "react-redux";
import {store, ReportedError} from "@birdiecare/galette-core";

import RetryButton from "./RetryButton";

const {actions: {dismissError}} = store;

type Props = {
  reportedError: ReportedError;
  retryEnabled?: boolean;
  containerStyle?: any;
  
  dismissError: (identifier: string) => void;
  retry: (error: ReportedError) => void;
}

class ErrorMessage extends Component<Props, {}>
{
  static defaultProps = {
    retryEnabled: true,
  };

  render() {
    const { reportedError, retryEnabled } = this.props;

    return (
      <View style={[styles.errorContainer, this.props.containerStyle]}>
        <TouchableHighlight onPress={() => {
          this.props.dismissError(reportedError.identifier);
        }} style={{flex: 1}}>
          <View style={styles.touchableHighlightContainer}>
            <Text style={styles.errorText}>{reportedError.message}</Text>
            {retryEnabled && reportedError.triggerAction && (
              <RetryButton onPress={() => this.props.retry(reportedError)} />
            )}
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    minHeight: 38,
    backgroundColor: 'red',
    borderTopWidth: 1,
    borderTopColor: '#fff'
  },
  touchableHighlightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  errorText: {
    padding: 5,
    flex: 1,
    color: 'white'
  }
});

export default connect(undefined, dispatch => {
  return {
    retry: (reportedError : ReportedError) => {
      dispatch(reportedError.triggerAction);
      dispatch(dismissError(reportedError.identifier));
    },
    dismissError: identifier => dispatch(dismissError(identifier)),
  }
})(ErrorMessage);
