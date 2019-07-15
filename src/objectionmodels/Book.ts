import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class Book extends BaseModel{
    
    //props
    id: number;
    isbn: string;
    title: string;

    static get tableName() {
        return 'books';
    }
    
    static get relationMappings(){
        const Author = require('./Author');
        const BookAuthor = require('./BookAuthor');

        return {
            authors: {
                relation: Model.ManyToManyRelation,
                modelClass: Author,
                join: {
                    from: 'book.id',
                    through: {
                        modelClass: BookAuthor,
                        from: 'bookauthors.bookid',
                        to: 'bookauthors.authorid'
                    },
                    to: 'authors.id'
                }
            }
        };
    }
}