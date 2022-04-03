import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Source } from './source.model';

@Injectable()
export class SourcesService {
    constructor(
        @InjectModel('Source') private readonly sourceModel: Model<Source>,
      ) {}

    // function to add a new source
    async insertSource(name: string, url: string) {
      const newSource = new this.sourceModel({
          name,
          url,
      });
      const result = await newSource.save();
      return result.id as string;
    }

    //function to get list of all musics 
    async getSources() {
        const sources = await this.sourceModel.find().exec();
        return sources.map(source => ({
          id: source.id,
          name: source.name,
          url: source.url,
        }));
      }

    // function to update a source by its id
    async updateSource(sourceId: string, name: string, url: string) {
        const updatedSource = await this.findSource(sourceId);
        if(name){
            updatedSource.name = name;
        }
        if(url){
            updatedSource.url = url;
        }
        updatedSource.save();
        
      }

    // function to delete a given source by its id
    async deleteSource(sourceId: string) {
        const result = await this.sourceModel.deleteOne({_id: sourceId}).exec();
        if (result.deletedCount === 0) {
          throw new NotFoundException('Could not find Source.');
        }
        return result;
      }



    // A private function for finding a music in the database using its id --- an utility function
    private async findSource(id: string): Promise<Source> {
        let source;
        try {
          source = await this.sourceModel.findById(id).exec();
        //   console.log("tried\n");
        } catch (error) {
            // console.log("error bro\n");
          throw new NotFoundException('Could not find source.');
        }
        if (!source) {
            // console.log("nahi mila\n");
          throw new NotFoundException('Could not find source.');
        }
        return source;
      }


}