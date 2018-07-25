import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import WaitUntilEntityIsLoadedFactory from "./components/WaitUntilEntityIsLoadedFactory";

type Action = any;
type ConnectEntityOptions = {
  property: string;
  loadEntityAction: (identifier: string) => Action;
  entitySelector: (state: any, identifier: string) => any;
  identifierFromPropsResolver: (props: any) => string;
}

export default function connectEntity(DecoratedComponent, options : ConnectEntityOptions)
{
  return connect((state, props) => {
    let identifier = options.identifierFromPropsResolver(props);

    return {
      [options.property]: options.entitySelector(state, identifier),
    }
  }, dispatch => {
    return bindActionCreators({
      loadEntity: options.loadEntityAction,
    }, dispatch);
  })(WaitUntilEntityIsLoadedFactory(DecoratedComponent, {
    havePropertiesChanged: (prevProps, newProps) => {
      return prevProps[options.property] !== newProps[options.property];
    },
    loadObject: (props) => {
      props.loadEntity(
        options.identifierFromPropsResolver(props)
      )
    },
    objectIsLoaded: (props) => {
      return !!props[options.property];
    }
  }));
};
