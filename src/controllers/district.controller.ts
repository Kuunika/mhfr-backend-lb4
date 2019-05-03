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
import {District} from '../models';
import {DistrictRepository} from '../repositories';

export class DistrictController {
  constructor(
    @repository(DistrictRepository)
    public districtRepository : DistrictRepository,
  ) {}

  @post('/districts', {
    responses: {
      '200': {
        description: 'District model instance',
        content: {'application/json': {schema: {'x-ts-type': District}}},
      },
    },
  })
  async create(@requestBody() district: District): Promise<District> {
    return await this.districtRepository.create(district);
  }

  @get('/districts/count', {
    responses: {
      '200': {
        description: 'District model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(District)) where?: Where,
  ): Promise<Count> {
    return await this.districtRepository.count(where);
  }

  @get('/districts', {
    responses: {
      '200': {
        description: 'Array of District model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': District}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(District)) filter?: Filter,
  ): Promise<District[]> {
    return await this.districtRepository.find(filter);
  }

  @patch('/districts', {
    responses: {
      '200': {
        description: 'District PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() district: District,
    @param.query.object('where', getWhereSchemaFor(District)) where?: Where,
  ): Promise<Count> {
    return await this.districtRepository.updateAll(district, where);
  }

  @get('/districts/{id}', {
    responses: {
      '200': {
        description: 'District model instance',
        content: {'application/json': {schema: {'x-ts-type': District}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<District> {
    return await this.districtRepository.findById(id);
  }

  @patch('/districts/{id}', {
    responses: {
      '204': {
        description: 'District PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() district: District,
  ): Promise<void> {
    await this.districtRepository.updateById(id, district);
  }

  @put('/districts/{id}', {
    responses: {
      '204': {
        description: 'District PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() district: District,
  ): Promise<void> {
    await this.districtRepository.replaceById(id, district);
  }

  @del('/districts/{id}', {
    responses: {
      '204': {
        description: 'District DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.districtRepository.deleteById(id);
  }
}
