import { HttpException, HttpStatus } from '@nestjs/common';

export const verifyEmail = (email: string) =>
  email &&
  email.trim() &&
  email.trim().length > 0 &&
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim());