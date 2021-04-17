import { Circle } from './Circle'
import { UserRepository } from '../user/UserRepository'

export class CircleFullSpecification {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  isSatisfiedBy(circle: Circle): boolean {
    const users = this.userRepository.findByIds(circle.members)
    const premiumUserNumber = users.filter((user) => user.isPremium).length
    const circleUpperLimit = premiumUserNumber < 10 ? 30 : 50
    return circle.countMembers() >= circleUpperLimit
  }
}
