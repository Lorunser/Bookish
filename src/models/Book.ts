import { Model } from 'objection';
import BaseModel from './BaseModel';
import path from 'path';

export default class Book extends BaseModel{
    
    //props
    id: number;
    isbn: string;
    title: string;

    static get tableName() {
        return 'books';
    }
    
    static get relationMappings(){
        //const Author = require('./Author');
        //const BookAuthor = require('./BookAuthor');
        //const Copy = require('./Copy');

        return {
            authors: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'Author'),
                join: {
                    from: 'books.id',
                    through: {
                        //modelClass: path.join(__dirname, 'BookAuthor'),
                        from: 'bookauthors.bookid',
                        to: 'bookauthors.authorid'
                    },
                    to: 'authors.id'
                }
            },
            bookauthors: {
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, 'BookAuthor'),
                join: {
                    from: 'books.id',
                    to: 'bookauthors.id'
                }
            },
            copies: {
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, 'Copy'),
                join: {
                    from: 'books.id',
                    to: 'copies.bookid'
                }
            }
        };
    }

    async populateNavsAsync(): Promise<Book>{        
        try {
            let completeBook = await Book.query()
            .findById(this.id)
            .eager('[authors, copies]');
            return completeBook;
        } catch (err) {
            console.log('error in book.ts');
            console.log(err);
            let FakeBook = new Book();
            FakeBook.isbn = '3483294237'
            FakeBook.title = 'Fake Book'
            return FakeBook;
        }
    }
}