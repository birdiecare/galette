import React, {Component} from 'react'
import {ListView, View, Text} from "react-native";
import {List, FormLabel} from "react-native-elements";
import ZeroStatePlaceholder from "../../empty-state/ZeroStatePlaceholder";
import Collection from "../Collection";

export type Props = {
  collection: Collection;
  renderRow: (item: any, id: string | number) => any;
  title?: string;

  zeroStatePlaceHolderMessage?: string;
  zeroStatePlaceHolder?: any;
};

export default class CollectionComponent extends Component<Props, {}> {
  render() {
    let {collection, renderRow} = this.props;
    let dataSource = collection.dataSource();

    return (
      <View>
        {this.props.title && (
          <FormLabel>{this.props.title}</FormLabel>
        )}

        {collection.hasError() && (
          <Text>Something went wrong, sorry for the inconvenience.</Text>
        )}

        <List>
          {dataSource.getRowCount() === 0 && !collection.isLoading() && (
            this.props.zeroStatePlaceHolder ? this.props.zeroStatePlaceHolder : (
              <ZeroStatePlaceholder message={this.props.zeroStatePlaceHolderMessage || "List is empty."}/>
            )
          )}

          <ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={(item, id) => {
              return renderRow(item, id)
            }}/>
        </List>
      </View>
    )
  }
}
