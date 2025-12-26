import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(email: string, password: string) {
    const isers = await this.usersService.find(email);

    if (isers.length) throw new BadRequestException('Email in use');

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
  }
  signin() {}
}
