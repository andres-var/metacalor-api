import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { Promise as Bluebird } from 'bluebird';

import { SeederInterface } from './interfaces';
import { CreateAlimentDto } from 'src/aliments/dto/create-aliment.dto';
import { AlimentsService } from 'src/aliments/aliments.service';

@Injectable()
export class AlimentsSeeder implements SeederInterface {
  constructor(private readonly alimentsService: AlimentsService) {}

  async seed() {
    const path = __dirname + '/data/aliments.json';
    const data: CreateAlimentDto[] = JSON.parse(fs.readFileSync(path, 'utf8'));

    await Bluebird.each(data, async (data) => {
      delete data['id'];
      await this.alimentsService.create({ ...data });
    });
  }
}
