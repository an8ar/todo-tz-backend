import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [PrismaModule, AuthModule, JwtModule],
})
export class TodoModule {}
