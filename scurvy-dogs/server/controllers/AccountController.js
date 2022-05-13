import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { entriesService } from '../services/EntriesService.js'
import { historiesService } from '../services/HistoriesService.js'
import { shipsService } from '../services/ShipsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/entries", this.getEntries)
      .get("/history", this.getHistory)
      .post("/ship", this.createShip)
      .put("", this.edit)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getEntries(req, res, next)
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

  async getHistory(req, res, next)
  {
        try
        {
            return res.send(await historiesService.getByAccountId(req.userInfo.id));
        }
        catch(error)
        {
            next(error);
        }
  }

  async createShip(req, res, next)
  {
        try
        {
            req.body.accountId = req.userInfo.id;
            req.body.isSunk = false;
            return res.send(await shipsService.createShip(req.body));
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
        return res.send(await accountService.updateAccount(req.body));
     }
     catch(error)
     {
         next(error);
     }
  }
}
