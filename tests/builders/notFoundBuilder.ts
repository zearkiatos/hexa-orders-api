import BaseBuilder from "@Builders/baseBuilder";

class NotFoundBuilder extends BaseBuilder {
  public message: string;
  constructor() {
    super();
    this.message = "Route not found 🤯";
  }

  withMessage(message: string): NotFoundBuilder {
    this.message = message;
    return this;
  }
}

export default NotFoundBuilder;
