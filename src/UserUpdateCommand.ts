export class UserUpdateCommand {
  id: string
  name: string | undefined
  mailAddress: string | undefined

  constructor(id: string) {
    this.id = id
  }
}
