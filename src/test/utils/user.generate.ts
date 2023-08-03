import { faker } from '@faker-js/faker';

export function generateUserData(override = {}) {
    return [{
        nickName: faker.person.firstName(),
        playerNumber: faker.number.int(10),
        ...override
    }]
}

export function generateUsersData(n: number= 1 ) {
    return Array.from({
        length: n
      }, (_, i) => {
        return generateUserData()
    }); 
} 

export function generateUserPayload() {
    return [{
            nickName: faker.person.firstName(),
            playerNumber: faker.number.int(10)
        }]
  }