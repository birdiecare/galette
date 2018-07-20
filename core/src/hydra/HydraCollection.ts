import Collection, {CollectionStructure} from '../store/Collection';

export type HydraResponse = {
  "hydra:member"?: any[];
}

export function collectionStructureFromHydraResponse(hydraResponse: HydraResponse) : CollectionStructure
{
  const items = hydraResponse['hydra:member'] || [];

  return {
    items,
  };
}

export default class HydraCollection extends Collection {
  constructor(response: object) {
    super(collectionStructureFromHydraResponse(response));
  }
}
