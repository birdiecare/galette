import React, {Component} from 'react'
import { View, Text, TouchableHighlight, StyleSheet} from "react-native";

import { ReportedError } from "../types";

type Props = {
  reportedError: ReportedError;
  onPress?: () => void;
}

export default class ErrorMessage extends Component<Props, {}>
{
  render() {
    return (
      <View style={styles.errorContainer}>
        <TouchableHighlight onPress={this.props.onPress}>
          <Text style={styles.errorText}>{this.props.reportedError.message}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'red',
    borderTopWidth: 1,
    borderTopColor: '#fff'
  },
  errorText: {
    padding: 10,
    color: 'white'
  }
});
