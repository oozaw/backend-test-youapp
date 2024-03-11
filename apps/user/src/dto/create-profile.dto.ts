import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  horoscope?: string;

  @IsString()
  @IsOptional()
  zodiac?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}
