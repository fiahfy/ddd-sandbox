import { Circle } from './Circle'
import { CircleName } from './CircleName'
import { User } from './User'

export interface CircleFactory {
  create: (name: CircleName, owner: User) => Circle
}
