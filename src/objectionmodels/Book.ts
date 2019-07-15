import { Model } from 'objection';

export default class Book extends Model{
    
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

    static get JsonSchema() {
        return {
            type: 'object',
            required: ['isbn', 'title'],

            properties: {
                id: {type: 'integer'},
                isbn: {type: 'string'},
                title: {type: 'string'}
            }
        }
    }
}

module.exports.Book = Book;