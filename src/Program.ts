import { InMemoryUserFactory } from './InMemoryUserFactory'
import { InMemoryUserRepository } from './InMemoryUserRepository'
import { User } from './User'
import { UserApplicationService } from './UserApplicationService'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserService } from './UserService'
import { UserUpdateCommand } from './UserUpdateCommand'

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

    const updateMailAddressCommand = new UserUpdateCommand(id)
    updateNameCommand.mailAddress = 'xxxx@example.com'
    userApplicationService.update(updateMailAddressCommand)
  }
}

Program.main()
