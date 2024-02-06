import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.body.dto';
import { Tags, Todo } from '@prisma/client';
import { BatchPayload } from './interfaces/batch-payload.interface';
import { TodoIdDto } from '../todo/dto/todo-id.body.dto';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async createTag(data: CreateTagDto, userId): Promise<Tags> {
    return this.prismaService.tags.create({ data: { ...data, userId } });
  }

  async assignTodo(todoIds: TodoIdDto[], tagId: number): Promise<BatchPayload> {
    console.log(tagId);
    return this.prismaService.todoTags.createMany({
      data: todoIds.map((todo) => ({
        todoId: +todo.id,
        tagId,
      })),
    });
  }

  async updateTag(tagId: number, name: string): Promise<Tags> {
    return this.prismaService.tags.update({
      where: { id: tagId },
      data: { name },
    });
  }
  async deleteTag(tagId: number) {
    return this.prismaService.tags.delete({ where: { id: tagId } });
  }
  async getTag(tagId: number, userId: number): Promise<Tags> {
    return this.prismaService.tags.findUnique({
      where: { id: tagId, userId: userId },
    });
  }
  async getAllTags(userId) {
    return this.prismaService.tags.findMany({ where: { userId } });
  }
  async getTagTodos(tagId: number, userId: number): Promise<Todo[]> {
    const todoTagLinks = await this.prismaService.todoTags.findMany({
      where: { tagId },
    });

    const todoIds = todoTagLinks.map((link) => link.todoId);

    return this.prismaService.todo.findMany({
      where: {
        id: {
          in: todoIds,
        },
        userId,
      },
    });
  }
}
