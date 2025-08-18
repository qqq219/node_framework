import { RedisModule } from "@nestjs-modules/ioredis"

export default  RedisModule.forRoot({
    type: 'single',
    options: {
      host: "110.41.165.112",
      port: 6379,
      password: "q4217715",
      db: 2
    },
  })