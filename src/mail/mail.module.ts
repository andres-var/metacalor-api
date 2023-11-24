import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailAuthService } from './mail-auth.service';
import { CommonModule } from 'src/common/common.module';
import { MailRemindersService } from './mail-reminders.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: 587,
          auth: {
            user: config.get('MAIL'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `${config.get('PROJECT_NAME')} ${config.get('MAIL_FROM')}`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    CommonModule,
  ],
  providers: [MailAuthService, MailRemindersService],
  exports: [MailAuthService, MailRemindersService],
})
export class MailModule {}
