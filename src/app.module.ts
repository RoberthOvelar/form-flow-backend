import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtGuardProvider } from '@modules/auth/jwt.guard';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/form-flow'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [JwtGuardProvider, AppService],
})
export class AppModule {}
