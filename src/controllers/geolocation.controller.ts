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
import {Geolocation} from '../models';
import {GeolocationRepository} from '../repositories';

export class GeolocationController {
  constructor(
    @repository(GeolocationRepository)
    public geolocationRepository : GeolocationRepository,
  ) {}

  @post('/geolocations', {
    responses: {
      '200': {
        description: 'Geolocation model instance',
        content: {'application/json': {schema: {'x-ts-type': Geolocation}}},
      },
    },
  })
  async create(@requestBody() geolocation: Geolocation): Promise<Geolocation> {
    return await this.geolocationRepository.create(geolocation);
  }

  @get('/geolocations/count', {
    responses: {
      '200': {
        description: 'Geolocation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Geolocation)) where?: Where,
  ): Promise<Count> {
    return await this.geolocationRepository.count(where);
  }

  @get('/geolocations', {
    responses: {
      '200': {
        description: 'Array of Geolocation model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Geolocation}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Geolocation)) filter?: Filter,
  ): Promise<Geolocation[]> {
    return await this.geolocationRepository.find(filter);
  }

  @patch('/geolocations', {
    responses: {
      '200': {
        description: 'Geolocation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() geolocation: Geolocation,
    @param.query.object('where', getWhereSchemaFor(Geolocation)) where?: Where,
  ): Promise<Count> {
    return await this.geolocationRepository.updateAll(geolocation, where);
  }

  @get('/geolocations/{id}', {
    responses: {
      '200': {
        description: 'Geolocation model instance',
        content: {'application/json': {schema: {'x-ts-type': Geolocation}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Geolocation> {
    return await this.geolocationRepository.findById(id);
  }

  @patch('/geolocations/{id}', {
    responses: {
      '204': {
        description: 'Geolocation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() geolocation: Geolocation,
  ): Promise<void> {
    await this.geolocationRepository.updateById(id, geolocation);
  }

  @put('/geolocations/{id}', {
    responses: {
      '204': {
        description: 'Geolocation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() geolocation: Geolocation,
  ): Promise<void> {
    await this.geolocationRepository.replaceById(id, geolocation);
  }

  @del('/geolocations/{id}', {
    responses: {
      '204': {
        description: 'Geolocation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.geolocationRepository.deleteById(id);
  }
}
