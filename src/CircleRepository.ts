import { Circle } from './Circle'
import { CircleId } from './CircleId'
import { CircleName } from './CircleName'

export interface CircleRepository {
  find: (id: CircleId) => Circle | undefined
  findByCircleName: (name: CircleName) => Circle | undefined
  findAll: () => Circle[]
  save: (circle: Circle) => void
  delete: (circle: Circle) => void
}
