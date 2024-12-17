export default {
  redisCacheExpiresIn: 60,
  refreshTokenExpiresIn: 60,
  accessTokenExpiresIn: 60,
  origin: process.env.REDIS_ORIGIN,
  redisurl: process.env.REDIS_URL,
  accessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY,
};
