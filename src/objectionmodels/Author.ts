import { Model } from 'objection';

export default class Author extends Model{

    id: number;
    name: string;
    
    static get tableName() {
        return 'authors';
    }
    
    static get relationMappings(){
        const Book = require('./Book');
        const BookAuthor = require('./BookAuthor');

        return {
            books: {
                relation: Model.ManyToManyRelation,
                modelClass: Book,
                join: {
                    from: 'authors.id',
                    through: {
                        modelClass: BookAuthor,
                        from: 'bookauthors.authorid',
                        to: 'books.id'
                    },
                    to: 'books.authorid'
                }
            }
        };
    }
}