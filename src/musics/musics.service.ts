import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Music } from './music.model';

@Injectable()
export class MusicsService {
  constructor(
    @InjectModel('Music') private readonly musicModel: Model<Music>,
  ) {}

  //function to insert a new music
  async insertMusic(
    title: string,
    album: string,
    artist: string,
    year: number,
    metaData: [{ key: string; value: string }],
  ) {
    console.log(title, album, artist, year, metaData);
    const newMusic = new this.musicModel({
      title,
      album,
      artist,
      year,
      metaData,
    });
    const result = await newMusic.save();
    return result.id as string;
  }

  //function to get list of all musics
  async getMusics() {
    const musics = await this.musicModel.find().exec();
    return musics.map((music) => ({
      id: music.id,
      title: music.title,
      album: music.album,
      artist: music.artist,
      metaData: music.metaData,
    }));
  }

  //function to update a music entry
  async updateMusic(
    musicId: string,
    title: string,
    artist: string,
    year: number,
  ) {
    const updatedmusic = await this.findMusic(musicId);
    console.log(title, musicId, artist, year);
    if (title) {
      console.log(title);
      updatedmusic.title = title;
    }
    if (artist) {
      updatedmusic.artist = artist;
    }
    if (year) {
      updatedmusic.year = year;
    }
    updatedmusic.save();
  }

  // function to delete a given music by its id
  async deleteMusic(musicId: string) {
    const result = await this.musicModel.deleteOne({ _id: musicId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find Music.');
    }
    return result;
  }

  // A private function for finding a music in the database using its id --- an utility function
  private async findMusic(id: string): Promise<Music> {
    let music;
    try {
      music = await this.musicModel.findById(id).exec();
      //   console.log("tried\n");
    } catch (error) {
      // console.log("error bro\n");
      throw new NotFoundException('Could not find music.');
    }
    if (!music) {
      // console.log("nahi mila\n");
      throw new NotFoundException('Could not find music.');
    }
    return music;
  }
}
