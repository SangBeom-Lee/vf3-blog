import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(({ app }) => {
  app.config.errorHandler = (err) => {
    const msg = err instanceof Error ? err.message : '알 수 없는 에러'
    Notify.create({
      type: 'negative',
      message: msg,
      timeout: 0,
      actions: [
        { label: '확인', color: 'white', handler: () => { /* */ } }
      ]
    })
  }
})
