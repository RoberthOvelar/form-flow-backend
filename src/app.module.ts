import { JwtGuardProvider } from '@/guards/jwt.guard';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import app from '@config/app';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
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
  providers: [JwtGuardProvider],
})
export class AppModule {}
