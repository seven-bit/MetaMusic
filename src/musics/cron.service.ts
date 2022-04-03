import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { Model } from 'mongoose';
const urlExists = require('url-exists-async-await');

import { Music } from './music.model';
import { Source } from '../sources/source.model';

@Injectable()
export class CronService {
  constructor(
    private httpService: HttpService,
    @InjectModel('Music') private readonly musicModel: Model<Music>,
    @InjectModel('Source') private readonly sourcecModel: Model<Source>,
  ) {}

  @Cron('0 0 * * *', { timeZone: 'UTC' }) //run everyday at 12:00 AM - Timezone UTC
  async updateMetaData() {
    console.log('Called every day at 12:00 AM');

    const musics = await this.musicModel.find().exec();
    const sources = await this.sourcecModel.find().exec();

    //loop over all the musics
    musics.forEach(async (music) => {
      // adding all the source name i.e key in each metadata to a set
      //  to check if metadata from given source already exists in the music
      let music_source_track = new Set();
      music.metaData.forEach((metadata) => {
        music_source_track.add(metadata.key);
      });

      // loop over all the sources
      sources.forEach(async (source) => {
        // if music already has a metadata from the given source we don't need to
        // check it again( As mentioned during description )
        if (music_source_track.has(source.name)) {
          console.log(source.name, 'checking ');
          return;
        }

        // if given source metadata not present we want to add it to music
        const sourceName = source.name;
        const sourceURL = source.url;

        // check if source url is functional i.e returns status success: 200 or not
        // const source_GET_status =  await (await firstValueFrom(this.httpService.get(sourceURL)));
        const exists = await this.urlVal(sourceURL);
        let source_GET_status = 404;
        if (exists) {
          source_GET_status = await (
            await firstValueFrom(this.httpService.get(sourceURL))
          ).status;
        } else {
          music_source_track.add(sourceName);
          return;
        }

        if (!(source_GET_status === 200)) {
          return;
        }

        console.log('passed');
        const randomString = this.randomStringGenerator(36);
        const mockedMetaData = {
          key: sourceName,
          value: randomString,
        };

        music.metaData.push(mockedMetaData);
        await music.save();
      });
    });
  }

  randomStringGenerator(length: number) {
    // program to generate random strings

    // declare all characters
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async urlVal(data) {
    try {
      const result = await urlExists(data);
      console.log(`Result for ${data} is ${result}`);
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
