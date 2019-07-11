import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";
import Author from "../models/Author";


export default class AuthorController extends BaseController{

    constructor(dbc: DbConnection){
        super(dbc, "Authors");
    }

    async getById(request, response){        
        let id = request.params.id;

        let jsonAuthor = await super.getByIdSupplied(id, "authorid");
        let author = new Author(jsonAuthor);
        await author.populateNavsAsync(this.dbc);

        response.json(author);
    }
}