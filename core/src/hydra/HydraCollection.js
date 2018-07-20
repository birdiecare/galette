import { ListView } from "react-native";
import Collection from './Collection';

export default class HydraCollection extends Collection
{
    constructor(response) {
        super(response, 'hydra:member');
    }
}
