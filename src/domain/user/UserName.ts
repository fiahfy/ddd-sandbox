export class UserName {
  readonly value: string

  constructor(value: string) {
    if (value.length < 3) {
      throw new Error('ユーザ名は3文字以上です')
    }
    if (value.length > 20) {
      throw new Error('ユーザ名は20文字以下です')
    }
    this.value = value
  }
}
