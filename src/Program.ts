import { InMemoryUserFactory } from './infrastructure/user/InMemoryUserFactory'
import { InMemoryUserRepository } from './infrastructure/user/InMemoryUserRepository'
import { User } from './domain/user/User'
import { UserApplicationService } from './application/user/UserApplicationService'
import { UserId } from './domain/user/UserId'
import { UserName } from './domain/user/UserName'
import { UserService } from './domain/user/UserService'
import { UserUpdateCommand } from './application/user/UserUpdateCommand'

class Program {
  static main(): void {
    const userFactory = new InMemoryUserFactory()
    const userRepository = new InMemoryUserRepository()
    const userService = new UserService(userRepository)
    const userApplicationService = new UserApplicationService(
      userFactory,
      userRepository,
      userService
    )

    const id = 'test-id'
    const user = new User(new UserId(id), new UserName('test-user'))
    userRepository.save(user)

    const updateNameCommand = new UserUpdateCommand(id)
    updateNameCommand.name = 'naruse'
    userApplicationService.update(updateNameCommand)

    const foundUser = userRepository.find(new UserId(id))
    console.log(foundUser)
  }
}

Program.main()
