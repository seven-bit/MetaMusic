import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { SourceSchema } from './source.model';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Source', schema: SourceSchema }]),],
    controllers: [SourcesController],
    providers: [SourcesService],
  })

export class SourcesModule {}