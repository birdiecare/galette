import { ListView } from "react-native";

export class NativeCollection extends Collection
{
  dataSource() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let items = this.items();

    return ds.cloneWithRows(items);
  }
}
