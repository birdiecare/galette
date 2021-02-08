import CoreCollection from '@birdiecare/galette-core/dist/store/Collection'

export default class Collection extends CoreCollection {
  dataSource() {
    return this.items()
  }
}
