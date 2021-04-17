import { CircleMembers } from './CircleMembers'

export class CircleMembersFullSpecification {
  isSatisfiedBy(members: CircleMembers): boolean {
    const premiumUserNumber = members.countPremiumMembers(false)
    const circleUpperLimit = premiumUserNumber < 10 ? 30 : 50
    return members.countMembers() >= circleUpperLimit
  }
}
