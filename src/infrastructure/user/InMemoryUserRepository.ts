import { User } from '../../domain/user/User'
import { UserId } from '../../domain/user/UserId'
import { UserName } from '../../domain/user/UserName'
import { UserRepository } from '../../domain/user/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private readonly store: { [id: string]: User } = {}

  find(id: UserId): User | undefined {
    const target = this.store[id.value]
    return target && this.clone(target)
  }

  findByUserName(name: UserName): User | undefined {
    const target = Object.values(this.store).find(
      (user) => user.name.value === name.value
    )
    return target && this.clone(target)
  }

  findAll(): User[] {
    return Object.values(this.store).map((user) => this.clone(user))
  }

  findByIds(ids: UserId[]): User[] {
    return ids.reduce((carry, id) => {
      const user = this.store[id.value]
      return user ? [...carry, this.clone(user)] : carry
    }, [] as User[])
  }

  save(user: User): void {
    this.store[user.id.value] = this.clone(user)
  }

  delete(user: User): void {
    delete this.store[user.id.value]
  }

  private clone(user: User) {
    return new User(user.id, user.name)
  }
}
