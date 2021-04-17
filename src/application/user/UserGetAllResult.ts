import { UserData } from './UserData'

export class UserGetAllResult {
  readonly users: UserData[]

  constructor(users: UserData[]) {
    this.users = users
  }
}
