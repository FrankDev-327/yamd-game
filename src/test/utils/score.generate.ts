import { faker } from '@faker-js/faker';
import { User } from '../../entity/User';

export function generateScoreData(overide = {}) {
    return {
      total_score: faker.number.int(),
      category: faker.word.noun(5),
      user: new User(),
      ...overide
    }
  }

  export function generateScoresData(n: number = 1, overide = {}) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateScoreData(overide)
    });
  }

  export function generateScorePayload() {
    return {
        total_score: faker.number.int(),
        category: faker.word.noun(5),
        userId: 1
    }
  }