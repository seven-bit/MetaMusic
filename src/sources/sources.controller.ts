import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { SourcesService } from './sources.service';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  //POST req to add a new source
  @Post()
  async addSource(
    @Body('name') sourceName: string,
    @Body('url') sourceUrl: string,
  ) {
    const generatedId = await this.sourcesService.insertSource(
      sourceName,
      sourceUrl,
    );
    return { id: generatedId };
  }

  //GET req to view all present sources details
  @Get()
  async getAllSources() {
    const sources = await this.sourcesService.getSources();
    return sources;
  }

  // PATCH req to upadate a source by its id
  @Patch(':id')
  async updateSource(
    @Param('id') sourceId: string,
    @Body('name') sourceName: string,
    @Body('url') sourceUrl: string,
  ) {
    await this.sourcesService.updateSource(sourceId, sourceName, sourceUrl);
    return null;
  }

  // DELETE req to delete a source by its id
  @Delete(':id')
  async removeSource(@Param('id') sourceId: string) {
    const ret = await this.sourcesService.deleteSource(sourceId);
    return ret;
  }
}
