import { User } from '../../domain/user/User'
import { UserFactory } from '../../domain/user/UserFactory'
import { UserId } from '../../domain/user/UserId'
import { UserName } from '../../domain/user/UserName'

export class InMemoryUserFactory implements UserFactory {
  private currentId = 0

  create(name: UserName): User {
    this.currentId++

    return new User(new UserId(this.currentId.toString()), name)
  }
}
