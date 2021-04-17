import { CircleCreateCommand } from './CircleCreateCommand'
import { CircleFactory } from '../../domain/circle/CircleFactory'
import { CircleId } from '../../domain/circle/CircleId'
import { CircleJoinCommand } from './CircleJoinCommand'
import { CircleMembers } from '../../domain/circle_members/CircleMembers'
import { CircleMembersFullSpecification } from '../../domain/circle_members/CircleMemberFullSpecification'
import { CircleName } from '../../domain/circle/CircleName'
import { CircleRepository } from '../../domain/circle/CircleRepository'
import { CircleService } from '../../domain/circle/CircleService'
import { CircleUpdateCommand } from './CircleUpdateCommand'
import { UserId } from '../../domain/user/UserId'
import { UserRepository } from '../../domain/user/UserRepository'

export class CircleApplicationService {
  private readonly circleFactory: CircleFactory
  private readonly circleRepository: CircleRepository
  private readonly circleService: CircleService
  private readonly userRepository: UserRepository

  constructor(
    circleFactory: CircleFactory,
    circleRepository: CircleRepository,
    circleService: CircleService,
    userRepository: UserRepository
  ) {
    this.circleFactory = circleFactory
    this.circleRepository = circleRepository
    this.circleService = circleService
    this.userRepository = userRepository
  }

  create(command: CircleCreateCommand): void {
    const ownerId = new UserId(command.userId)
    const owner = this.userRepository.find(ownerId)
    if (!owner) {
      throw new Error('サークルのオーナーとなるユーザが見つかりませんでした')
    }
    const name = new CircleName(command.name)
    const circle = this.circleFactory.create(name, owner)
    if (this.circleService.exists(circle)) {
      throw new Error('サークルは既に存在しています')
    }
    this.circleRepository.save(circle)
  }

  update(command: CircleUpdateCommand): void {
    const id = new CircleId(command.id)
    const circle = this.circleRepository.find(id)
    if (!circle) {
      throw new Error('サークルが見つかりませんでした')
    }
    if (command.name) {
      const name = new CircleName(command.name)
      circle.changeName(name)
      if (this.circleService.exists(circle)) {
        throw new Error('サークルは既に存在しています')
      }
    }
    this.circleRepository.save(circle)
  }

  join(command: CircleJoinCommand): void {
    const memberId = new UserId(command.userId)
    const member = this.userRepository.find(memberId)
    if (!member) {
      throw new Error('ユーザが見つかりませんでした')
    }
    const id = new CircleId(command.circleId)
    const circle = this.circleRepository.find(id)
    if (!circle) {
      throw new Error('サークルが見つかりませんでした')
    }
    const owner = this.userRepository.find(circle.owner)
    if (!owner) {
      throw new Error('オーナーが見つかりませんでした')
    }
    const members = this.userRepository.findByIds(circle.members)
    const circleMembers = new CircleMembers(circle.id, owner, members)
    const circleFullSpecification = new CircleMembersFullSpecification()
    if (circleFullSpecification.isSatisfiedBy(circleMembers)) {
      throw new Error()
    }
    circle.join(member)
    this.circleRepository.save(circle)
  }
}
