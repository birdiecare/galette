import React from "react";
import {ActivityIndicator, View} from "react-native";

type State = {
  isLoading: boolean;
}

export default function WaitUntilEntityIsLoadedFactory (DecoratedComponent, descriptor) {
  return class extends React.Component<{}, State> {
    static navigationOptions = DecoratedComponent.navigationOptions;

    constructor(props) {
      super(props);

      this.state = {
        isLoading: false
      };
    }

    componentDidMount() {
      this.ensureObjectIsLoaded();
    }

    componentDidUpdate(prevProps) {
      if (descriptor.havePropertiesChanged(prevProps, this.props)) {
        this.ensureObjectIsLoaded();
      }
    }

    ensureObjectIsLoaded() {
      if (!descriptor.objectIsLoaded(this.props)) {
        if (!this.state.isLoading) {
          this.setState({
            isLoading: true
          });

          descriptor.loadObject(this.props);
        }
      } else if (this.state.isLoading) {
        this.setState({
          isLoading: false
        });
      }
    }

    render() {
      if (!descriptor.objectIsLoaded(this.props)) {
        return (
          <View style={{
          position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <ActivityIndicator
          size="small"
        color={"#fff"}/>
        </View>
      )
      }

      return <DecoratedComponent {...this.props} />
    }
  }
};
