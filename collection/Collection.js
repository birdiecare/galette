import { ListView } from "react-native";

export default class Collection
{
    constructor(list, itemsKey = 'items') {
        this.list = list;
        this.itemsKey = itemsKey;
    }

    items() {
        return this.list[this.itemsKey] || []
    }

    filter(callback) {
        return new Collection({
            ...this.list,
            [this.itemsKey]: this.items().filter(callback),
        });
    }

    map(callback) {
        return new Collection({
            ...this.list,
            [this.itemsKey]: this.items().map(callback),
        });
    }

    dataSource() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let items = this.items();

        return ds.cloneWithRows(items);
    }

    hasError() {
        return !!this.list.error;
    }

    isLoading() {
        return this.list.loading || false;
    }

    getPage() {
        return this.list.up_to_page;
    }

    hasMore() {
        if (this.list.total_items === undefined) {
            return true;
        }

        return this.list.total_items > this.items().length;
    }
}
