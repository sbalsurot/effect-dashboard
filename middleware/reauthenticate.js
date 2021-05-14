import { accessContext } from '../plugins/transit'

export default function reauthenticate (context) {
  const providers = accessContext.getWalletProviders()
  const providerIds = providers.map(provider => provider.id)
  const localStorageKeys = Object.keys(window.localStorage)
  const TOKEN_PROPERTY = 'data'

  providerIds.forEach((providerId) => {
    localStorageKeys.forEach(async (key) => {
      if (key.includes(providerId)) {
        try {
          const token = JSON.parse(window.localStorage.getItem(key))

          if (Object.prototype.hasOwnProperty.call(token, TOKEN_PROPERTY)) {
            const { data } = token
            const { auth } = data
            const { actor, permission } = auth
            const wallet = accessContext.initWallet(providerId)

            await wallet.connect()
            await wallet.login(actor, permission)
            return context.$wallet.init(wallet)
          }
        } catch (error) {}
      }
    })
  })
}
