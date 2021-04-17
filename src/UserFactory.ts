import { User } from './User'
import { UserName } from './UserName'

export interface UserFactory {
  create: (name: UserName) => User
}
