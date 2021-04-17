export class CircleCreateCommand {
  userId: string
  name: string

  constructor(userId: string, name: string) {
    this.userId = userId
    this.name = name
  }
}
