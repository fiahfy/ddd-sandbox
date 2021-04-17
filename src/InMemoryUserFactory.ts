import { User } from './User'
import { UserFactory } from './UserFactory'
import { UserId } from './UserId'
import { UserName } from './UserName'

export class InMemoryUserFactory implements UserFactory {
  private currentId = 0

  create(name: UserName): User {
    this.currentId++

    return new User(new UserId(this.currentId.toString()), name)
  }
}
