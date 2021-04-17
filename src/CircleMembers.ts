import { CircleId } from './CircleId'
import { User } from './User'

export class CircleMembers {
  readonly id: CircleId
  owner: User
  members: User[]

  constructor(id: CircleId, owner: User, members: User[]) {
    this.id = id
    this.owner = owner
    this.members = members
  }

  countMembers(): number {
    return this.members.length + 1
  }

  countPremiumMembers(containsOwner = true): number {
    const premiumUserNumber = this.members.filter((member) => member.isPremium)
      .length
    if (containsOwner) {
      return premiumUserNumber + (this.owner.isPremium ? 1 : 0)
    } else {
      return premiumUserNumber
    }
  }
}
