import { ProxyState } from '../AppState.js'
import { audience, clientId, domain } from '../env.js'
import { accountService } from './AccountService.js'
import { api } from './AxiosService.js'
// import { socketService } from './SocketService.js'

// @ts-ignore
// eslint-disable-next-line no-undef
export const AuthService = Auth0Provider.initialize({
  domain,
  clientId,
  audience,
  useRefreshTokens: true,
  onRedirectCallback: appState => {
    window.location.replace(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async() => {
  api.defaults.headers.authorization = AuthService.bearer
  api.interceptors.request.use(refreshAuthToken)
  ProxyState.user = AuthService.user
  await accountService.getAccount()
  // socketService.authenticate(AuthService.bearer)
})

async function refreshAuthToken(config) {
  if (!AuthService.isAuthenticated) { return config }
  const expires = AuthService.identity.exp * 1000
  const expired = expires < Date.now()
  const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12)
  if (expired) {
    await AuthService.loginWithPopup()
    // socketService.authenticate(AuthService.bearer)
  } else if (needsRefresh) {
    await AuthService.getTokenSilently()
    // socketService.authenticate(AuthService.bearer)
  }
  api.defaults.headers.authorization = AuthService.bearer
  return config
}
