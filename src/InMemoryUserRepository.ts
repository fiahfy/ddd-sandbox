import { User } from './User'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserRepository } from './UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private readonly store: Map<UserId, User> = new Map()

  find(id: UserId): User | undefined {
    return this.store.get(id)
  }

  findByUserName(name: UserName): User | undefined {
    return Array.from(this.store.values()).find(
      (user) => user.name.value === name.value
    )
  }

  findAll(): User[] {
    return Array.from(this.store.values())
  }

  findByIds(ids: UserId[]): User[] {
    return ids.reduce((carry, id) => {
      const user = this.store.get(id)
      return user ? [...carry, user] : carry
    }, [] as User[])
  }

  save(user: User): void {
    this.store.set(user.id, user)
  }

  delete(user: User): void {
    this.store.delete(user.id)
  }
}
