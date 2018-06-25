import React, { Component } from 'react'
import {ListView, View, Text} from "react-native";
import {List, FormLabel} from "react-native-elements";
import ZeroStatePlaceholder from "../../empty-state/ZeroStatePlaceholder";
import PropTypes from "prop-types";

export default class Collection extends Component
{
    static propTypes = {
        collection: PropTypes.object.isRequired,
        renderRow: PropTypes.func.isRequired,

        title: PropTypes.string,
        zeroStatePlaceHolder: PropTypes.any,
        zeroStatePlaceHolderMessage: PropTypes.string,
    };

    render() {
        let { collection, renderRow } = this.props;
        let dataSource = collection.dataSource();

        return (
            <View>
                {this.props.title && (
                    <FormLabel>{this.props.title}</FormLabel>
                )}

                {collection.hasError() && (
                    <Text>Something went wrong...</Text>
                )}

                <List>
                    {dataSource.getRowCount() === 0 && !collection.isLoading() && (
                        this.props.zeroStatePlaceHolder ? this.props.zeroStatePlaceHolder : (
                            <ZeroStatePlaceholder message={this.props.zeroStatePlaceHolderMessage || "List is empty."} />
                        )
                    )}

                    <ListView
                        dataSource={dataSource}
                        renderRow={(item, id) => {
                            return renderRow(item, id)
                        }} />
                </List>
            </View>
        )
    }
}
