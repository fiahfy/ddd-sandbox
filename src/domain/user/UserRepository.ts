import { User } from './User'
import { UserId } from './UserId'
import { UserName } from './UserName'

export interface UserRepository {
  find: (id: UserId) => User | undefined
  findByUserName: (name: UserName) => User | undefined
  findAll: () => User[]
  findByIds: (ids: UserId[]) => User[]
  save: (user: User) => void
  delete: (user: User) => void
}
