import { InMemoryUserFactory } from '../src/InMemoryUserFactory'
import { InMemoryUserRepository } from '../src/InMemoryUserRepository'
import { User } from '../src/User'
import { UserApplicationService } from '../src/UserApplicationService'
import { UserId } from '../src/UserId'
import { UserName } from '../src/UserName'
import { UserRegisterCommand } from '../src/UserRegisterCommand'
import { UserService } from '../src/UserService'

describe('UserRegisterTest', () => {
  const userFactory = new InMemoryUserFactory()
  const userRepository = new InMemoryUserRepository()
  const userService = new UserService(userRepository)
  const userApplicationService = new UserApplicationService(
    userFactory,
    userRepository,
    userService
  )

  it('TestSuccessMinUserName', () => {
    const userName = '123'
    const userNameInputData = new UserRegisterCommand(userName)
    userApplicationService.register(userNameInputData)

    const createdUserName = new UserName(userName)
    const createdUser = userRepository.find(createdUserName)
    expect(createdUser).not.toBeNull()
  })

  it('TestSuccessMaxUserName', () => {
    const userName = '12345678901234567890'
    const userNameInputData = new UserRegisterCommand(userName)
    userApplicationService.register(userNameInputData)

    const createdUserName = new UserName(userName)
    const createdUser = userRepository.find(createdUserName)
    expect(createdUser).not.toBeNull()
  })

  it('TestInvalidUserNameLengthMin', () => {
    const userName = '12'
    const userNameInputData = new UserRegisterCommand(userName)
    expect(() => {
      userApplicationService.register(userNameInputData)
    }).toThrow('ユーザ名は3文字以上です')
  })

  it('TestInvalidUserNameLengthMax', () => {
    const userName = '123456789012345678901'
    const userNameInputData = new UserRegisterCommand(userName)
    expect(() => {
      userApplicationService.register(userNameInputData)
    }).toThrow('ユーザ名は20文字以下です')
  })

  it('TestAlreadyExists', () => {
    const userName = 'test-user'
    userRepository.save(new User(new UserId('test-id'), new UserName(userName)))

    const userNameInputData = new UserRegisterCommand(userName)
    expect(() => {
      userApplicationService.register(userNameInputData)
    }).toThrow('ユーザは既に存在しています')
  })
})
