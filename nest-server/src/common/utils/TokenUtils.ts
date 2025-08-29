
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenUtil {
  jwtService:JwtService
  constructor(
    private readonly config:ConfigService,
  ){
    this.jwtService = new JwtService({
      secret: config.get('jwt.secretkey')
    })
  }

  /**
   * 从数据声明生成令牌
   *
   * @param payload 数据声明
   * @return 令牌
   */
  createToken = function(payload: { user_key: string; user_id: number, username: string }): string {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  /**
   * 从令牌中获取数据声明
   *
   * @param token 令牌
   * @return 数据声明
   */
  parseToken = function(token: string) {
    try {
      if (!token) return null;
      const payload =  this.jwtService.verify(token.replace('Bearer ', ''));
      return payload;
    } catch (error) {
      return null;
    }
  }
}
