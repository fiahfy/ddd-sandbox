import { UserId } from './UserId'
import { UserName } from './UserName'

export class User {
  readonly id: UserId
  name: UserName
  isPremium: boolean

  constructor(id: UserId, name: UserName, isPremium = false) {
    this.id = id
    this.name = name
    this.isPremium = isPremium
  }

  changeName(name: UserName): void {
    this.name = name
  }
}
