import * as React from 'react'
import {Component} from "react";
import {getToken} from "../token";

export default class TokenEnforcementWall extends Component {
  render() {
    if (getToken()) {
      return this.props.children;
    }

    return (
      <div>
        <h1>You need to be authenticated.</h1>
        <form method="get">
          <p>
            <label>Token</label>
            <input type="text" name="access_token"/>
          </p>
          <p>
            <button type="submit">Login</button>
          </p>
        </form>
      </div>
    )
  }
}
