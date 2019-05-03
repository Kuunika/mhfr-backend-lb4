import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Zone} from '../models';
import {ZoneRepository} from '../repositories';

export class ZoneController {
  constructor(
    @repository(ZoneRepository)
    public zoneRepository : ZoneRepository,
  ) {}

  @post('/zones', {
    responses: {
      '200': {
        description: 'Zone model instance',
        content: {'application/json': {schema: {'x-ts-type': Zone}}},
      },
    },
  })
  async create(@requestBody() zone: Zone): Promise<Zone> {
    return await this.zoneRepository.create(zone);
  }

  @get('/zones/count', {
    responses: {
      '200': {
        description: 'Zone model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Zone)) where?: Where,
  ): Promise<Count> {
    return await this.zoneRepository.count(where);
  }

  @get('/zones', {
    responses: {
      '200': {
        description: 'Array of Zone model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Zone}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Zone)) filter?: Filter,
  ): Promise<Zone[]> {
    return await this.zoneRepository.find(filter);
  }

  @patch('/zones', {
    responses: {
      '200': {
        description: 'Zone PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() zone: Zone,
    @param.query.object('where', getWhereSchemaFor(Zone)) where?: Where,
  ): Promise<Count> {
    return await this.zoneRepository.updateAll(zone, where);
  }

  @get('/zones/{id}', {
    responses: {
      '200': {
        description: 'Zone model instance',
        content: {'application/json': {schema: {'x-ts-type': Zone}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Zone> {
    return await this.zoneRepository.findById(id);
  }

  @patch('/zones/{id}', {
    responses: {
      '204': {
        description: 'Zone PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() zone: Zone,
  ): Promise<void> {
    await this.zoneRepository.updateById(id, zone);
  }

  @put('/zones/{id}', {
    responses: {
      '204': {
        description: 'Zone PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() zone: Zone,
  ): Promise<void> {
    await this.zoneRepository.replaceById(id, zone);
  }

  @del('/zones/{id}', {
    responses: {
      '204': {
        description: 'Zone DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.zoneRepository.deleteById(id);
  }
}
