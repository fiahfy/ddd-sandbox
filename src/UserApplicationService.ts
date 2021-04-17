import { UserData } from './UserData'
import { UserDeleteCommand } from './UserDeleteCommand'
import { UserFactory } from './UserFactory'
import { UserGetAllResult } from './UserGetAllResult'
import { UserGetCommand } from './UserGetCommand'
import { UserGetResult } from './UserGetResult'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserRegisterCommand } from './UserRegisterCommand'
import { UserRepository } from './UserRepository'
import { UserService } from './UserService'
import { UserUpdateCommand } from './UserUpdateCommand'

export class UserApplicationService {
  private readonly userFactory: UserFactory
  private readonly userRepository: UserRepository
  private readonly userService: UserService

  constructor(
    userFactory: UserFactory,
    userRepository: UserRepository,
    userService: UserService
  ) {
    this.userFactory = userFactory
    this.userRepository = userRepository
    this.userService = userService
  }

  get(command: UserGetCommand): UserGetResult {
    const targetId = new UserId(command.id)
    const user = this.userRepository.find(targetId)
    if (!user) {
      throw new Error('ユーザが見つかりませんでした')
    }
    const data = new UserData(user)
    return new UserGetResult(data)
  }

  getAll(): UserGetAllResult {
    const users = this.userRepository.findAll()
    const userModels = users.map((user) => new UserData(user))
    return new UserGetAllResult(userModels)
  }

  register(command: UserRegisterCommand): void {
    const userName = new UserName(command.name)
    const user = this.userFactory.create(userName)
    if (this.userService.exists(user)) {
      throw new Error('ユーザは既に存在しています')
    }
    this.userRepository.save(user)
  }

  update(command: UserUpdateCommand): void {
    const targetId = new UserId(command.id)
    const user = this.userRepository.find(targetId)
    if (!user) {
      throw new Error('ユーザが存在しません')
    }
    const name = command.name
    if (name) {
      const newUserName = new UserName(name)
      user.changeName(newUserName)
      if (this.userService.exists(user)) {
        throw new Error('ユーザは既に存在しています')
      }
    }
    this.userRepository.save(user)
  }

  delete(command: UserDeleteCommand): void {
    const targetId = new UserId(command.id)
    const user = this.userRepository.find(targetId)
    if (!user) {
      return
    }
    this.userRepository.delete(user)
  }
}
