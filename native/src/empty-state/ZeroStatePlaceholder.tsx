import React, {Component} from "react"
import {Text, View} from "react-native";

type Props = {
  message: string;

  description?: string;
};

export default class ZeroStatePlaceholder extends Component<Props, {}> {
  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={{paddingBottom: 10, textAlign: 'center', fontWeight: 'bold'}}>{this.props.message}</Text>
        {this.props.description && (
          <Text style={{textAlign: 'center'}}>{this.props.description}</Text>
        )}
      </View>
    )
  }
}
