import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"

export class BossesController extends BaseController
{
    constructor()
    {
        super("api/boss")
        {
            this.router
                .use(Auth0Provider.getAuthorizedUserInfo)
                .put("/:id", this.edit)
        }
    }

    async edit(req, res, next)
    {
        try
        {
            req.body.id = req.params.id;
            req.creatorId = req.userInfo.id;
            return res.send();
        }
        catch(error)
        {
            next(error);
        }
    }
}