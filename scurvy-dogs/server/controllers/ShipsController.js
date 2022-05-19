import { Auth0Provider } from "@bcwdev/auth0provider";
import { historiesService } from "../services/HistoriesService.js";
import { shipsService } from "../services/ShipsService.js";
import { upgradesService } from "../services/UpgradesService.js";
import { socketProvider } from "../SocketProvider.js";
import BaseController from "../utils/BaseController.js";

export class ShipsController extends BaseController
{
    constructor()
    {
        super("api/ships");
        this.router
            .get("/:id", this.getById)
            .get("/:id/history", this.getHistoryById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("/:id/upgrade", this.addUpgrade)
            .post('/:id/attack', this.attack)
            .put("/:id", this.edit)
            .delete("/:id", this.remove);
    }
   async attack(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const bosshp = await shipsService.attack(req.body, req.params.id)
            return res.send("niiiiiiiiiiice")

        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next)
    {
       try
       {
           return res.send(await shipsService.getById(req.params.id));
       }
       catch(error)
       {
           next(error);
       }
    }

    async getHistoryById(req, res, next)
    {
       try
       {
           return res.send(await historiesService.getByShipId(req.params.id));
       }
       catch(error)
       {
           next(error);
       }
    }
    
    async addUpgrade(req, res, next)
    {
       try
       {
           return res.send(upgradesService.addToShip(req.body.upgradeId, req.params.id));
       }
       catch(error)
       {
           next(error);
       }
    }

    async edit(req, res, next)
    {
       try
       {
           req.body.accountId = req.userInfo.id;
           req.body.id = req.params.id;
           return res.send(await shipsService.edit(req.body));
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
           return res.send(await shipsService.remove(req.params.id, req.userInfo.id));
       }
       catch(error)
       {
           next(error);
       }
    }

}