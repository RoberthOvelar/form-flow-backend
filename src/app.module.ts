import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { JwtGuardProvider } from '@/guards/jwt.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import app from '@config/app';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ConfigModule.forRoot({
      load: [app],
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<MongooseModuleFactoryOptions>('db'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [JwtGuardProvider, AppService],
})
export class AppModule {}
