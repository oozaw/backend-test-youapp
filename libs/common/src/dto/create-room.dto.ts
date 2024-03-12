import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ type: [String], required: true })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  members: string[];

  @IsArray()
  @IsOptional()
  messages?: [];

  @IsString()
  @IsOptional()
  createdBy?: string;
}
