export class NotificationContent {
  readonly #content: string;

  constructor(content: string) {
    const isLengthValid = this.validateLength(content);

    if (!isLengthValid) {
      throw new Error("Content length must be between 5 and 255");
    }

    this.#content = content;
  }

  get value() {
    return this.#content;
  }

  public toString() {
    return this.value;
  }

  public toJSON() {
    return this.value;
  }

  private validateLength(content: string): boolean {
    return content.length >= 5 && content.length <= 255;
  }
}
