import { join } from 'path';

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailAuthService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  private readonly HOST_API = this.config.get('HOST_API');
  private readonly HOST_FRONTEND = this.config.get('HOST_FRONTEND');
  private readonly PROJECT_NAME = this.config.get('PROJECT_NAME');
  private readonly logger = new Logger(MailAuthService.name);

  async sendUserConfirmation(user: User) {
    const url = `${this.HOST_API}/auth/verify/${user.id}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Bienvenido a ${this.PROJECT_NAME}`,
        template: './verification',
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, '/images/logo.png'),
            cid: 'logo',
          },
        ],
        context: {
          url,
          name: user.name,
          lastName: user.lastName,
          appName: this.PROJECT_NAME,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async resetPassword(user: User, token: string) {
    const url = `${this.HOST_FRONTEND}/auth/new-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Restablecimiento de contraseña ${this.PROJECT_NAME}`,
        template: './reset-password',
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, '/images/logo.png'),
            cid: 'logo',
          },
        ],
        context: {
          url,
          appName: this.PROJECT_NAME,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
