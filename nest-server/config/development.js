module.exports = {
    "server":{
        "port": 8081
    },
    "redis":{
        "host": "110.41.165.112",
        "port": 6379,
        "password": "q4217715",
        "db": 2
    },
    "typeOrm":{
        type: 'mysql',
        host: '110.41.165.112',
        port: 3896,
        username: 'ruoyi_react_nestjs',
        password: 'Si6B8CdAysNZSkfF',
        database: 'ruoyi_react_nestjs',
        synchronize: false,
        logging: true,
        connectorPackage: 'mysql2',
        "extra": {
            "connectionLimit": 10, // 根据需要调整连接池大小
            "acquireTimeout": 10000, // 获取连接的超时时间
            "waitForConnections": true, // 当没有连接可用时是否等待
            "queueLimit": 0, // 排队等待连接的请求数量限制
            "idleTimeout": 60000, // 空闲连接超时时间（毫秒）
            "connectTimeout": 30000, // 连接超时时间（毫秒）
        },
        "keepConnectionAlive": true,
        retryDelay: 3000, // 重试间隔时间（毫秒）
        retryAttempts: 10, // 重试次数
    },
    "swagger":{
        enable:true,
        title:"nest-react-app",
        desc:"Background system based on Nest.js + Umi full stack development",
        version:"1.0.0"
    }

}