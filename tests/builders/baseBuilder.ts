class BaseBuilder {
  build(): any {
    return Object.assign(this, {});
  }

  withParam(property: string, value: any) {
    this[property] = value;
    return this;
  }
}

export default BaseBuilder;
