import Collection from '../store/Collection';

export default class HydraCollection extends Collection
{
    constructor(response) {
        super(response, 'hydra:member');
    }
}
