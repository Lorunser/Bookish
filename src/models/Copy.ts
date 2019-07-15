import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class Copy extends BaseModel{
    
    id: number;
    bookid: number;

    static get tableName() {
        return 'copies';
    }
    
    static get relationMappings(){
        const Book = require('./Book');
        const Loan = require('./Loan');

        return {
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: 'copies.bookid',
                    to: 'books.id'
                }
            },
            loans: {
                relation: Model.HasManyRelation,
                modelClass: Loan,
                join: {
                    from: 'copies.id',
                    to: 'loans.copyid'
                }
            }
        };
    }
}