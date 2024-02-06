import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  topic: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  deadlineDate?: Date;
}
