import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { decryptAES_Hex, encryptAES_Hex } from 'src/tool/cryoto'
import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { MuExceptions205NoEncrypted } from '../MuExceptions205'

@Injectable()
export class ResponseHttpInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>()
    const request = context.switchToHttp().getRequest<Request>()

    // 不加密接口
    if (/^\/api\/(explorer|pool|rpc)/.test(request.url)) {
      return next.handle().pipe(
        map((data) => {
          BigInt.prototype['toJSON'] = function () {
            return this.toString()
          }

          const res = {
            data,
            code: 200,
            message: ''
          }

          return res
        })
      )
    }
    // 如果是对外的链操作，加密方式不一样
    else if (/^\/api\/(discord-bot)/.test(request.url)) {
      const discordApiKey = request.headers.discordapikey as string
      if (!discordApiKey || discordApiKey !== '999000aaajjj@123') throw new MuExceptions205NoEncrypted('discord key error')

      return next.handle().pipe(
        map((data) => {
          BigInt.prototype['toJSON'] = function () {
            return this.toString()
          }

          const res = {
            data,
            code: 200,
            message: ''
          }

          return res
        })
      )
    } else {
      const apiTest = request.headers.apitest as string
      let isApiTest = false
      if ((apiTest === 'api123qweApi' && process.env.IS_DEBUG === 'true') || /^\/api\/(version)/.test(request.url)) isApiTest = true

      let AES_KEY = process.env.AES_KEY

      if (!isApiTest && request && request.method === 'POST' && request.body && Object.entries(request.body).length) {
        let body = Object.entries(request.body)[0][0]
        if (!body) throw new BadRequestException('body error 0')
        const vi = request.headers.time as string
        if (!vi) throw new BadRequestException('body error 1')

        const data = decryptAES_Hex(body, vi, AES_KEY)
        if (!data) throw new BadRequestException('body error 2')
        request.body = JSON.parse(data)
      }

      const iv = Date.now() + ''
      response.header('time', iv)
      return next.handle().pipe(
        map((data) => {
          BigInt.prototype['toJSON'] = function () {
            return this.toString()
          }

          const res = {
            data,
            code: 200,
            message: ''
          }

          if (!isApiTest) {
            const encryptedData = encryptAES_Hex(JSON.stringify(res), iv, AES_KEY)
            // console.log(decryptAES(encryptedData, iv), 'res')

            return encryptedData
          }
          return res
        })
      )
    }
  }
}
