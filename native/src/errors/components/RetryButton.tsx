import React, { Component } from "react"
import { Text, View, TouchableHighlight } from "react-native"
import { Icon } from 'react-native-elements';

type Props = {
  onPress: () => void;
}

export default class RetryButton extends Component<Props, {}>
{
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={{backgroundColor: 'white', padding: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="cached" size={15} color={"#333"} />
          <Text style={{color: '#333', paddingLeft: 5}}>Retry</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
