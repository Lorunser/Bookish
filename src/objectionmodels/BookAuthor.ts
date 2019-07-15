import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class BookAuthor extends BaseModel{
    
    bookid: number;
    authorid: number;

    static get idColumn(){
        return ['bookid', 'authorid'];
    }

    static get tableName() {
        return 'bookauthors';
    }
    
    static get relationMappings(){
        const Book = require('./Book');
        const Author = require('./Author');

        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: Author,
                join: {
                    from: 'bookauthors.authorid',
                    to: 'authors.id'
                }
            },
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: 'bookauthors.bookid',
                    to: 'books.id'
                }
            }
        };
    }
}