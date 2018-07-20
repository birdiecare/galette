export type CollectionStructure = {
  items?: any[];
  error?: string;
  loading?: boolean;

  up_to_page?: number;
  total_items?: number;
};

export type CollectionItemMutator = (item : any) => any;

export default class Collection
{
  constructor(private structure: CollectionStructure)
  {
  }

  items() {
    return this.structure.items || []
  }

  filter(callback : CollectionItemMutator) {
    return new Collection({
      ...this.structure,
      items: this.items().filter(callback),
    });
  }

  map(callback : CollectionItemMutator) {
    return new Collection({
      ...this.structure,
      items: this.items().map(callback),
    });
  }

  hasError() {
    return !!this.structure.error;
  }

  isLoading() {
    return this.structure.loading || false;
  }

  getPage() {
    return this.structure.up_to_page;
  }

  hasMore() {
    if (this.structure.total_items === undefined) {
      return true;
    }

    return this.structure.total_items > this.items().length;
  }
}
