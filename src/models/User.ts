import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class User extends BaseModel{

    id: number;
    username: string;
    password: string;
    
    static get tableName() {
        return 'users';
    }
    
    static get relationMappings(){
        const Loan = require('./Loan');
        const BookAuthor = require('./BookAuthor');

        return {
            loans: {
                relation: Model.HasManyRelation,
                modelClass: Loan,
                join: {
                    from: 'users.id',
                    to: 'loans.userid'
                }
            }
        };
    }
}