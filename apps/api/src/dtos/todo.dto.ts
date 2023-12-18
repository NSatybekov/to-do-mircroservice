import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateToDoApiDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'Remember to buy milk' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  text: string;
}
