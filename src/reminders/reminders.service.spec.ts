import { Test, TestingModule } from '@nestjs/testing';
import { RemindersService } from './reminders.service';
import { JwtStrategy } from 'src/auth/strategies';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Reminder } from './entities/reminder.entity';
import { MailRemindersService } from 'src/mail/mail-reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemindersService,
        MailRemindersService,
        {
        provide: getModelToken(Reminder.name),
        useValue: {
          new: jest.fn().mockResolvedValue({}),
          constructor: jest.fn().mockResolvedValue({}),
          find: jest.fn(),
          findOne: jest.fn(), 
          create: jest.fn(), 
          update: jest.fn(),
          exec: jest.fn()
        }
      }],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
  });
  /*
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  */
 /*
  it('should create a reminder', async () => {
    const reminder = {
      name: 'Hora de comer',
      hour: '07:46',
      user: new User(),
    };

    const reminderDocument = {
      ...reminder,
      _id: '656573145f3ab7f229c78a58',
      save: jest.fn().mockResolvedValue(reminder),
    };
    jest.spyOn(service, 'create').mockResolvedValue(reminderDocument as any);
    const result = (await service.create(reminder, reminder.user));
    console.log(result);
    expect(await service.create(reminder, reminder.user)).toBe(reminder);
  });
*/
});