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
import { FeedbackType } from '../models';
import { FeedbackTypeRepository } from '../repositories';

export class FeedbackTypeController {
  constructor(
    @repository(FeedbackTypeRepository)
    public feedbackTypeRepository: FeedbackTypeRepository,
  ) { }

  @post('/feedback-types', {
    responses: {
      '200': {
        description: 'FeedbackType model instance',
        content: { 'application/json': { schema: { 'x-ts-type': FeedbackType } } },
      },
    },
  })
  async create(@requestBody() feedbackType: FeedbackType): Promise<FeedbackType> {
    return await this.feedbackTypeRepository.create(feedbackType);
  }

  @get('/feedback-types/count', {
    responses: {
      '200': {
        description: 'FeedbackType model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FeedbackType)) where?: Where,
  ): Promise<Count> {
    return await this.feedbackTypeRepository.count(where);
  }

  @get('/feedback-types', {
    responses: {
      '200': {
        description: 'Array of FeedbackType model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': FeedbackType } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FeedbackType)) filter?: Filter,
  ): Promise<FeedbackType[]> {
    return await this.feedbackTypeRepository.find(filter);
  }

  @patch('/feedback-types', {
    responses: {
      '200': {
        description: 'FeedbackType PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() feedbackType: FeedbackType,
    @param.query.object('where', getWhereSchemaFor(FeedbackType)) where?: Where,
  ): Promise<Count> {
    return await this.feedbackTypeRepository.updateAll(feedbackType, where);
  }

  @get('/feedback-types/{id}', {
    responses: {
      '200': {
        description: 'FeedbackType model instance',
        content: { 'application/json': { schema: { 'x-ts-type': FeedbackType } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<FeedbackType> {
    return await this.feedbackTypeRepository.findById(id);
  }

  @patch('/feedback-types/{id}', {
    responses: {
      '204': {
        description: 'FeedbackType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() feedbackType: FeedbackType,
  ): Promise<void> {
    await this.feedbackTypeRepository.updateById(id, feedbackType);
  }

  @put('/feedback-types/{id}', {
    responses: {
      '204': {
        description: 'FeedbackType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() feedbackType: FeedbackType,
  ): Promise<void> {
    await this.feedbackTypeRepository.replaceById(id, feedbackType);
  }

  @del('/feedback-types/{id}', {
    responses: {
      '204': {
        description: 'FeedbackType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.feedbackTypeRepository.deleteById(id);
  }
}
