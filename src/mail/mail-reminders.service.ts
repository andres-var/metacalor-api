import { join } from 'path';

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailRemindersService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  private readonly PROJECT_NAME = this.config.get('PROJECT_NAME');
  private readonly logger = new Logger(MailRemindersService.name);

  async send(user: User, reminder: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `${this.PROJECT_NAME}`,
        template: './reminders',
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, '/images/logo.png'),
            cid: 'logo',
          },
        ],
        context: {
          name: user.name,
          lastName: user.lastName,
          reminder,
          appName: this.PROJECT_NAME,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
