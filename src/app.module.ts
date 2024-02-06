import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [TodoModule, AuthModule, UserModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
