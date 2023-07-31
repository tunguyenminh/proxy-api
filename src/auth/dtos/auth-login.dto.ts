import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class LoginByUserName {
  @ApiProperty({
    example: 'username',
  })
  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  readonly username: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  readonly password: string;
}
