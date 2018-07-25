import React, {Component} from 'react'
import {ListView, View, Text, StyleSheet} from "react-native";
import { Error } from "../types";
import { dismissError } from "../actions";

type Props = {
  children: any;
  errors: Error[];
}

class ErrorWrapper extends Component<Props, {}>
{
  render() {
    return (
      <View>
        {this.props.errors.map((error, index) => {
          <View style={[styles.floatingBottom, {bottom: index * 40}]}>
            <ErrorMessage error={error} onPress={() => {
              this.props.dismissError(error.identifier);
            }}/>
          </View>
        })}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatingBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default connect(state => {
  return {
    errors: state.reportedErrors,
  }
}, dispatch => bindActionCreators({
  dismissError,
}, dispatch))(ErrorWrapper);
