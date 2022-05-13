import { Auth0Provider } from "@bcwdev/auth0provider"
import { bossesService } from "../services/BossesService.js";
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
                .delete("/:id", this.remove);
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

    async remove(req, res, next)
    {
        try
        {
            return res.send(await bossesService.remove(req.params.id, req.userInfo.id));
        }
        catch(error)
        {
            next(error);
        }
    }
}