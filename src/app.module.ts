import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'
import { CacheModule } from './common/services/cache.module'
import { ScheduleModule } from '@nestjs/schedule'

import { RpcModule } from './rpc/rpc.module';
import { ScashModule } from './scash/scash.module';
import { TimingModule } from './timing/timing.module';

@Module({
  imports: [PrismaModule, CacheModule, ScheduleModule.forRoot(), RpcModule, ScashModule, TimingModule],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private readonly prismaService: PrismaService) {
    if (process.env.IS_DATABASE_DEBUG === 'true') {
      process.env.MD5_KEY
      //@ts-ignore
      prismaService.$on('query', (e) => {
        //@ts-ignore
        console.log('Query: ' + e.query)
        //@ts-ignore

        // console.log('Params: ' + e.params)
        //@ts-ignore
        console.log('Duration: ' + e.duration + 'ms\n')
      })
    }
  }
}
