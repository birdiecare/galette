# Loaded Entity

The use-case is very simple, yet not commoditised. You want to display a detail
view for an entity. You want to:

* Display a feedback that the data is being loaded (if not yet available)
* Display your component only once the entity is loaded completely
* Handle errors in loading the entity

Wrapping your component, this module will display a loading indicator until your entity is properly loaded, and give this
entity as a prop of your component.

## Usage

The module ships with a `connectEntity` helper which hides most of the complexity. Alternatively, you can use the wrapper
component directly for a greater flexibility.

### With the `connectEntity` helper

In this example, we load the user if it is not yet found in the store.

```javascript
import {connectEntity} from "@kamet/native";

class UserScreen extends Component
{
  render() {
    console.log('Render user from: ', this.props.user);
  }
}

export default connectEntity(UserScreen, {
  property: 'user',
  loadEntityAction: loadUser,
  entitySelector: (state, username) => state.users[username],
  identifierFromPropsResolver: props => props.navigation.state.params.user_id
});
```

### Just with the wrapping component

```javascript
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {WaitUntilEntityIsLoadedFactory} from "@kamet/native";

const usernameFromProps = (props = {}) => {
  return props.username
    || (props.user && usernameFromProps(props.user))
    || (props.navigation && usernameFromProps(props.navigation.state.params));
};

export const connectEntity = (DecoratedComponent) => {
  return connect((state, props) => {
    let username = usernameFromProps(props);
    let user = username in state.users ? state.users[username] : {};

    return {
      user
    }
  }, dispatch => {
    return bindActionCreators({
      ,
    }, dispatch);
  })(WaitUntilEntityIsLoadedFactory(DecoratedComponent, {
    havePropertiesChanged: (prevProps, newProps) => {
      return prevProps.user !== newProps.user;
    },
    loadObject: (props) => {
      props.loadUser(usernameFromProps(props));
    },
    objectIsLoaded: (props) => {
      return props.user && props.user.name;
    }
  }));
};
```
