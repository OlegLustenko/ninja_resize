// @flow

import Koa from 'koa'
import mount from 'koa-mount'

import ResizerModule from './resizer/resizer-module'
import UploadModule from './upload/upload-module'

const APIModules = new Koa()

APIModules.use(mount('/upload', UploadModule))
APIModules.use(mount('/resizer', ResizerModule))

export default APIModules
