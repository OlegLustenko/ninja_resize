// @flow
import Koa from 'koa'
import router from 'koa-route'

const ResizerModule = new Koa()

ResizerModule.use(
  router.get('/', ctx => {
    ctx.body = 'hello resizer module'
  })
)

export default ResizerModule
