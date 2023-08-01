import { faker } from '@faker-js/faker';

export function generateUserData(override = {}) {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "123456789",
        ...override
    }
}

export function generateUsersData(n: number= 1 ) {
    return Array.from({
        length: n
      }, (_, i) => {
        return generateUserData()
    });
} 

export function generateUserPayload() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
    }
  }