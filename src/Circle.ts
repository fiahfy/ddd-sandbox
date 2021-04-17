import { CircleId } from './CircleId'
import { CircleName } from './CircleName'
import { User } from './User'
import { UserId } from './UserId'

export class Circle {
  readonly id: CircleId
  name: CircleName
  owner: UserId
  members: UserId[]

  constructor(
    id: CircleId,
    name: CircleName,
    owner: UserId,
    members: UserId[]
  ) {
    this.id = id
    this.name = name
    this.owner = owner
    this.members = members
  }

  isFull(): boolean {
    return this.countMembers() >= 30
  }

  join(member: User): void {
    if (this.isFull()) {
      throw new Error()
    }
    this.members.push(member.id)
  }

  countMembers(): number {
    return this.members.length + 1
  }

  changeName(name: CircleName): void {
    this.name = name
  }
}
