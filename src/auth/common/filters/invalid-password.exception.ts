
import { BadRequestException } from '@nestjs/common';

export class InvalidPasswordException extends BadRequestException {
  constructor(message: string = 'Invalid password') {
    super(message);
  }
}