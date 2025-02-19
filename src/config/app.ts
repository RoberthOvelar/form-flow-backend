import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export interface IAppConfig {
  jwt: JwtModuleOptions;
  db: MongooseModuleFactoryOptions;
}

export default (): IAppConfig => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
  },
  db: {
    uri: process.env.MONGO_URI,
  },
});
