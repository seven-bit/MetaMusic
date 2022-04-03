import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicsModule } from './musics/musics.module';
import { SourcesModule } from './sources/sources.module';

@Module({
  imports: [
    MusicsModule,
    SourcesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.hlr97.mongodb.net/MetaMusic?retryWrites=true&w=majority`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

