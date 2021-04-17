import { User } from '../../domain/user/User'

export class UserData {
  readonly id: string
  readonly name: string

  constructor(source: User) {
    this.id = source.id.value
    this.name = source.name.value
  }
}
