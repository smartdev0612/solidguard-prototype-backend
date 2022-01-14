import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSubscribeDto {
  emailAddrs: string[];
  contractAddrs: string[];
}

export class CreateSubscribeRequestDto {
  @IsArray()
  @IsEmail({}, { each: true })
  @ApiProperty({
    uniqueItems: true,
    example: ['admin@coolswap.com', 'mgmt@coolswap.com', 'jane.doe@gmail.com'],
  })
  emailAddrs: string[];
  @IsArray()
  @IsEthereumAddress({ each: true })
  @ApiProperty({
    uniqueItems: true,
    example: [
      '0x664d600ea18FFf6Ec2bE5AA3682931245C683bfC',
      '0x05BA813eA8d76b1553f68A1b5dC942e71846adD9',
    ],
  })
  contractAddrs: string[];
  @IsString()
  @ApiProperty({ example: '' })
  @IsNotEmpty()
  signedJSON: string;
}

export class CreateSubscribeResponseDto {
  @ApiResponseProperty({
    example: ['admin@coolswap.com', 'mgmt@coolswap.com', 'jane.doe@gmail.com'],
  })
  emailAddrs: string[];
  @ApiResponseProperty({
    example: [
      '0x664d600ea18FFf6Ec2bE5AA3682931245C683bfC',
      '0x05BA813eA8d76b1553f68A1b5dC942e71846adD9',
    ],
  })
  contractAddrs: string[];
}
