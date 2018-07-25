import React from 'react';
import {Text} from "react-native";

export class SimpleComponentExpectingAUserEntity extends React.Component
{
  render() {
    return (
      <Text>{this.props.user.name}</Text>
    )
  }
}
