export class UserId {
  readonly value: string

  constructor(value: string) {
    if (!value) {
      throw new Error('valueが空文字です')
    }
    this.value = value
  }
}
