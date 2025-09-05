import { Injectable } from '@nestjs/common'
import { CreateTimingDto } from './dto/create-timing.dto'
import { UpdateTimingDto } from './dto/update-timing.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Cron } from '@nestjs/schedule'
import { ScashService } from 'src/scash/scash.service'
import axios from 'axios'

@Injectable()
export class TimingService {
  constructor(
    private prismaService: PrismaService,
    private readonly scashService: ScashService
  ) {}

  // 定时获取区块链信息保存起来
  @Cron('0 */3 * * * *')
  async getBlockChainInfo() {
    const blockChainInfo = await this.scashService.getblockchaininfo()
    if (blockChainInfo.success) {
      try {
        const isHas = await this.prismaService.db_blockChainInfo.findFirst({
          where: {
            blocks: blockChainInfo.rpcData.blocks
          }
        })
        if (!isHas) {
          await this.prismaService.db_blockChainInfo.create({
            data: {
              ...blockChainInfo.rpcData
            }
          })
        }
      } catch (error) {
        console.log('获取区块链信息失败', error)
      }

      return {}
    }
  }

  // 每半个小时获取一次币价
  @Cron('0 */30 * * * *')
  async getPrice() {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=satoshi-cash-network&vs_currencies=usd'
      const res = await axios.get(url)

      if (res.data) {
        await this.prismaService.db_coinPrise.create({
          data: {
            price: res.data['satoshi-cash-network'].usd
          }
        })
      }
    } catch (error) {
      console.log('获取币价失败')
    }
  }
}
