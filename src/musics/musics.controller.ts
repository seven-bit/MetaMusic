import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  //GET req to view all present music details
  @Get()
  async getAllMusics() {
    const musics = await this.musicsService.getMusics();
    return musics;
  }

  //POST req to add a new music
  @Post()
  async addMusic(
    @Body('title') musicTitle: string,
    @Body('album') musicAlbum: string,
    @Body('artist') musicArtist: string,
    @Body('year') musicYear: number,
    @Body('metaData')
    musicMetaData: [
      {
        key: string;
        value: string;
      },
    ],
  ) {
    const generatedId = await this.musicsService.insertMusic(
      musicTitle,
      musicAlbum,
      musicArtist,
      musicYear,
      musicMetaData,
    );
    if (generatedId == '400') {
      return 'This music already exists';
    } else {
      return { id: generatedId };
    }
  }

  // PATCH req to upadate a music by its id
  @Patch(':id')
  async updateMusic(
    @Param('id') musicId: string,
    @Body('title') musicTitle: string,
    @Body('artist') musicArtist: string,
    @Body('year') musicYear: number,
  ) {
    await this.musicsService.updateMusic(
      musicId,
      musicTitle,
      musicArtist,
      musicYear,
    );
    return null;
  }

  // DELETE req to delete a music by its id
  @Delete(':id')
  async removeMusic(@Param('id') musicId: string) {
    const ret = await this.musicsService.deleteMusic(musicId);
    return ret;
  }
}
