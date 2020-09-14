import React, { Component, ReactNode } from 'react'
import { StyleProp, Text, ViewStyle, FlatList } from 'react-native'

import Collection from '../Collection'
import { FormLabel } from 'react-native-elements'
import ZeroStatePlaceholder from '../../empty-state/ZeroStatePlaceholder'

export type Props = {
  collection: Collection
  renderRow: (item: any, id: string | number) => any
  title?: string
  listViewStyle?: StyleProp<ViewStyle>
  zeroStatePlaceHolderMessage?: string
  zeroStatePlaceHolder?: ReactNode
  testID?: string
}

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

        {dataSource.length === 0 && !collection.isLoading() && (
          this.props.zeroStatePlaceHolder ? this.props.zeroStatePlaceHolder : (
            <ZeroStatePlaceholder message={this.props.zeroStatePlaceHolderMessage || "List is empty."}/>
          )
        )}

        <FlatList
          testID={this.props.testID}
          data={dataSource}
          style={this.props.listViewStyle}
          renderItem={({ item, index}) => renderRow(item, index)}
          keyExtractor={(_, index ) => index.toString()}
        />
      </React.Fragment>
    )
  }
}
