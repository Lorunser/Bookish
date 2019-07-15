import { Model } from 'objection';
import BaseModel from './BaseModel';
import path from 'path';

export default class Author extends BaseModel{

    id: number;
    name: string;
    
    static get tableName() {
        return 'authors';
    }
    
    static get relationMappings(){
        return {
            books: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'Book'),
                join: {
                    from: 'authors.id',
                    through: {
                        //modelClass: BookAuthor,
                        from: 'bookauthors.authorid',
                        to: 'bookauthors.bookid'
                    },
                    to: 'books.id'
                }
            }
        };
    }

    async populateNavsAsync(): Promise<Author>{
        let completeAuthor = await Author.query().findById(this.id)
            .eager('books');

        return completeAuthor;
    }
}