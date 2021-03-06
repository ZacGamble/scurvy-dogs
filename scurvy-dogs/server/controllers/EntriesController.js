import { Auth0Provider } from "@bcwdev/auth0provider";
import { entriesService } from "../services/EntriesService.js";
import BaseController from "../utils/BaseController.js";

export class EntriesController extends BaseController
{
    constructor()
    {
        super("api/entries");
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get("", this.getAllUserEntries)
            .get("/:id", this.getByLobby)
            .post("", this.create);
    }

    async getAllUserEntries(req, res, next)
    {
        try
        {
            return res.send(await entriesService.getByAccount(req.userInfo.id));
        }
        catch(error)
        {
            next(error);
        }
    }
    async getByLobby(req, res, next){
        try {
            return res.send(await entriesService.getByUserAndLobby(req.params.id, req.userInfo.id));
        } catch (error) {
            next(error)
        }
    }

 
    async create(req, res, next)
    {
        try
        {
            req.body.accountId = req.userInfo.id;
            return res.send(await entriesService.create(req.body));
        }
        catch(error)
        {
            next(error);
        }
    }

}