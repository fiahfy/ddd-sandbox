import { UserData } from './UserData'

export class UserGetResult {
  readonly user: UserData

  constructor(user: UserData) {
    this.user = user
  }
}
