import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class Loan extends BaseModel{

    copyid: number;
    userid: number;
    dateissued: Date;
    datedue: Date;
    datereturned: Date;

    static get tableName() {
        return 'loans';
    }
    
    static get relationMappings(){
        const Copy = require('./Copy');
        const User = require('./User');

        return {
            copy: {
                relation: Model.BelongsToOneRelation,
                modelClass: Copy,
                join: {
                    from: 'loans.copyid',
                    to: 'copies.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'loans.userid',
                    to: 'users.id'
                }
            }            
        };
    }
}