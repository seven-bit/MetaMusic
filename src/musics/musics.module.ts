import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { CronService } from './cron.service';
import { MusicSchema } from './music.model';
import { SourceSchema } from '../sources/source.model';


@Module({
    imports: [
      HttpModule,
      MongooseModule.forFeature([{ name: 'Music', schema: MusicSchema }]),
      MongooseModule.forFeature([{ name: 'Source', schema: SourceSchema }]),
      ScheduleModule.forRoot(),
    ],
    controllers: [MusicsController],
    providers: [MusicsService, CronService],
  })

export class MusicsModule {}