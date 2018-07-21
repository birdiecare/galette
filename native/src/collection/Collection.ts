import { ListView } from "react-native";
import CoreCollection from "@galette/core/dist/store/Collection";

export default class Collection extends CoreCollection
{
  dataSource() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let items = this.items();

    return ds.cloneWithRows(items);
  }
}
