export class UserUpdateCommand {
  id: string
  name: string | undefined

  constructor(id: string) {
    this.id = id
  }
}
