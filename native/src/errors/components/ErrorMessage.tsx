import React, {Component} from 'react'
import { View, Text, TouchableHighlight } from "react-native";

import { ReportedError } from "../types";

type Props = {
  reportedError: ReportedError;
  onPress?: () => void;
}

export default class ErrorMessage extends Component<Props, {}>
{
  render() {
    return (
      <View style={{backgroundColor: 'red'}}>
        <TouchableHighlight onPress={this.props.onPress} style={{padding: 10}}>
          <Text style={{color: 'white'}}>{this.props.reportedError.message}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
