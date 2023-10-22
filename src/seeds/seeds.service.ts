import { Injectable, Logger } from '@nestjs/common';
import { SeederInterface } from './interfaces';
import { Promise as Bluebird } from 'bluebird';

import { ConfigService } from '@nestjs/config';
import { UsersSeeder } from './users.seeder';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AlimentsSeeder } from './aliments.seeder';

@Injectable()
export class SeedsService {
  private readonly seeders: SeederInterface[] = [];
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    @InjectConnection()
    private connection: Connection,
    private readonly configService: ConfigService,
    private readonly usersSeeder: UsersSeeder,
    private readonly alimentsSeeder: AlimentsSeeder,
  ) {
    this.seeders = [this.usersSeeder, this.alimentsSeeder];
  }

  async run() {
    if (this.configService.get('NODE_ENV') === 'production') {
      throw new Error('Seeds can only be run in development mode');
    }

    await this.connection.dropDatabase();
    await this.connection.syncIndexes();

    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed();
    });

    return { status: 200 };
  }
}
