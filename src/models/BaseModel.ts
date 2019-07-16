import { Model } from 'objection';

export default class BaseModel extends Model{
    async populateNavsAsync(): Promise<BaseModel> {
        throw new Error("Must be implemented in derived class !!!!!!");
    }
}