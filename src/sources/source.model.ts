import * as mongoose from 'mongoose';

export const SourceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: {type: String, required: true}
});

export interface Source extends mongoose.Document {
    name: string;
    url: string;
  }