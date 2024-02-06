import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.body.dto';
import { UpdateTaskDto } from './dto/update-task.body.dto';
import { Status, Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto, userId: number): Promise<Todo> {
    try {
      return await this.prismaService.todo.create({
        data: { ...data, userId },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getAllTasks(userId: number): Promise<Todo[]> {
    try {
      console.log(Object.values(Status));
      return await this.prismaService.todo.findMany({ where: { userId } });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteTask(todoId: number): Promise<Todo> {
    try {
      return await this.prismaService.todo.delete({ where: { id: todoId } });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async updateTask(todoId: number, data: UpdateTaskDto): Promise<Todo> {
    try {
      return await this.prismaService.todo.update({
        where: { id: todoId },
        data: { ...data },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
  getAllStatuses(): string[] {
    return Object.values(Status);
  }
}
