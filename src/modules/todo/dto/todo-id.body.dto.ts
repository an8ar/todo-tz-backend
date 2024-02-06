import { IsNotEmpty, IsNumber } from 'class-validator';

export class TodoIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
