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
import {Feedback} from '../models';
import {FeedbackRepository} from '../repositories';

export class FeedbackController {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository : FeedbackRepository,
  ) {}

  @post('/feedbacks', {
    responses: {
      '200': {
        description: 'Feedback model instance',
        content: {'application/json': {schema: {'x-ts-type': Feedback}}},
      },
    },
  })
  async create(@requestBody() feedback: Feedback): Promise<Feedback> {
    return await this.feedbackRepository.create(feedback);
  }

  @get('/feedbacks/count', {
    responses: {
      '200': {
        description: 'Feedback model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Feedback)) where?: Where,
  ): Promise<Count> {
    return await this.feedbackRepository.count(where);
  }

  @get('/feedbacks', {
    responses: {
      '200': {
        description: 'Array of Feedback model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Feedback}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Feedback)) filter?: Filter,
  ): Promise<Feedback[]> {
    return await this.feedbackRepository.find(filter);
  }

  @patch('/feedbacks', {
    responses: {
      '200': {
        description: 'Feedback PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() feedback: Feedback,
    @param.query.object('where', getWhereSchemaFor(Feedback)) where?: Where,
  ): Promise<Count> {
    return await this.feedbackRepository.updateAll(feedback, where);
  }

  @get('/feedbacks/{id}', {
    responses: {
      '200': {
        description: 'Feedback model instance',
        content: {'application/json': {schema: {'x-ts-type': Feedback}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Feedback> {
    return await this.feedbackRepository.findById(id);
  }

  @patch('/feedbacks/{id}', {
    responses: {
      '204': {
        description: 'Feedback PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() feedback: Feedback,
  ): Promise<void> {
    await this.feedbackRepository.updateById(id, feedback);
  }

  @put('/feedbacks/{id}', {
    responses: {
      '204': {
        description: 'Feedback PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() feedback: Feedback,
  ): Promise<void> {
    await this.feedbackRepository.replaceById(id, feedback);
  }

  @del('/feedbacks/{id}', {
    responses: {
      '204': {
        description: 'Feedback DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.feedbackRepository.deleteById(id);
  }
}
