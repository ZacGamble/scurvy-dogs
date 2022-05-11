export class Value {
  constructor(data) {
    this.title = data.title
  }

  get Template() {
    return this.title
  }
}
