import React from 'react';
import {Text} from "react-native";

export const SimpleComponentExpectingAUserEntity: React.FC<{user: { name : string }}> = ({ user }) =>
  <Text>{user.name}</Text>
