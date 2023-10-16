import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  private readonly bcrypt = bcrypt;

  hashSync(password: string, salt = 10): string {
    return this.bcrypt.hashSync(password, salt);
  }

  compareSync(password: string, hashPassword: string) {
    return this.bcrypt.compareSync(password, hashPassword);
  }
}
