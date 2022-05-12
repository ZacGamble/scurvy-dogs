import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { historiesService } from '../services/HistoriesService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/history", this.getHistory)
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
