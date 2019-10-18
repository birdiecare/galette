import React, {Component, ReactNode} from 'react'
import {View, Text, StyleProp, ViewStyle} from "react-native";
import ListView from "deprecated-react-native-listview";

import {List, FormLabel} from "react-native-elements";
import ZeroStatePlaceholder from "../../empty-state/ZeroStatePlaceholder";
import Collection from "../Collection";

export type Props = {
  collection: Collection;
  renderRow: (item: any, id: string | number) => any;
  title?: string;
  listViewStyle?: StyleProp<ViewStyle>;
  zeroStatePlaceHolderMessage?: string;
  zeroStatePlaceHolder?: ReactNode;
};

export default class CollectionComponent extends Component<Props, {}> {
  render() {
    let {collection, renderRow} = this.props;
    let dataSource = collection.dataSource();

    return (
      <React.Fragment>
        {this.props.title && (
          <FormLabel>{this.props.title}</FormLabel>
        )}

        {collection.hasError() && (
          <Text>Something went wrong, sorry for the inconvenience.</Text>
        )}

        {dataSource.getRowCount() === 0 && !collection.isLoading() && (
          this.props.zeroStatePlaceHolder ? this.props.zeroStatePlaceHolder : (
            <ZeroStatePlaceholder message={this.props.zeroStatePlaceHolderMessage || "List is empty."}/>
          )
        )}

        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          style={this.props.listViewStyle}
          renderRow={(item, id) => {
            return renderRow(item, id)
          }}/>
      </React.Fragment>
    )
  }
}
