import { User } from './User'
import { UserRepository } from './UserRepository'

export class UserService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  exists(user: User): boolean {
    const duplicated = this.userRepository.findByUserName(user.name)
    return !!duplicated
  }
}
