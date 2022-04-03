import * as mongoose from 'mongoose';

export const MusicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    album: {type: String, required: true, immutable: true},
    artist: {type: String, required: true},
    year: {type: Number, required: true},
    metaData: [{
        key: {type: String, required: true},
        value: {type: String, required: true}
    }]
});

export interface Music extends mongoose.Document {
    id: string;
    title: string;
    album: string;
    artist: string;
    year: number;
    metaData: [{
        key: string,
        value: string
    }];
  }