import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'

export async function AccountValidator(req, res, next) {
  try {
    const bearer = req.headers.Authorization || req.headers.authorization
    if (!bearer) {
      return next()
    }
    const userInfo = await Auth0Provider.getUserInfoFromBearerToken(bearer)
    if (!userInfo.id) {
      throw new Error('[MISSING_AUTH0_RULE] Unable to create account: Missing Extend UserInfo rule in Auth0 account')
    }
    req.account = await accountService.getAccount(userInfo)
    next()
  } catch (e) {
    next(e)
  }
}
