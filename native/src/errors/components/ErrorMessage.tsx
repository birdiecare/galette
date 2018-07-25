import React, {Component} from 'react'
import { View, Text, TouchableHighlight } from "react-native";
import { Error } from "../types";

type Props = {
  error: Error;
  onPress?: () => void;
}

export default class ErrorMessage extends Component<Props, {}>
{
  render() {
    return (
      <View style={{backgroundColor: 'red'}}>
        <TouchableHighlight onPress={this.props.onPress}>
          <Text>{this.props.error.message}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
