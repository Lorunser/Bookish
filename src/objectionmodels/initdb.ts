import {Model, QueryBuilder} from 'objection' ;
import Knex from 'knex';
//const Knex= require('knex')
//const Model = require('objection')

//import models
import Book from './Book';
import Author from './Author';
import BookAuthor from './BookAuthor';

// Initialize knex.

const knex = Knex({
    client: 'pg',
    connection: 'postgres://bookish:JoshLawrence1@localhost:5432/bookish'
});

// Give the knex instance to objection.
Model.knex(knex);


async function createSchema() {    

    await knex.schema.dropTableIfExists('loans');
    await knex.schema.dropTableIfExists('copies');
    await knex.schema.dropTableIfExists('bookauthors');
    await knex.schema.dropTableIfExists('authors');
    await knex.schema.dropTableIfExists('books');
    await knex.schema.dropTableIfExists('users');

    await knex.schema.createTable('authors', table => {
        table.increments('id').primary();
        table.string('name').notNullable()
    });


    await knex.schema.createTable('books', table => {
        table.increments('id').primary();
        table.string('isbn').unique();
        table.string('title').notNullable();
    });

    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username').unique();
        table.string('password');
    });
    
    await knex.schema.createTable('bookauthors', table => {
        table.integer('bookid').references('books.id');
        table.integer('authorid').references('authors.id');
        table.primary(['bookid', 'authorid']);
    });

    await knex.schema.createTable('copies', table => {
        table.increments('id').primary();
        table.integer('bookid').references('books.id');
    });

    await knex.schema.createTable('loans', table => {
        table.increments('id').primary();
        table.integer('copyid').references('copies.id');
        table.integer('userid').references('users.id');
        table.date('dateissued');
        table.date('datedue');
        table.date('datereturned');
    });
}

async function main() {
    const book = await Book.query()
        .insert({
            isbn: '918237672342',
            title: 'Brave New World'
        });

    const author = await Author.query()
        .insert({
            name: 'Aldous Huxley'
        });

    const bookauthor = await BookAuthor.query()
        .insert({
            bookid: book.id,
            authorid: author.id
        })

    console.log('created: ', bookauthor);
}

createSchema()
    .then(() => main())
    .then(() => knex.destroy())
    .catch(err => {
        console.error(err);
        return knex.destroy();
    });