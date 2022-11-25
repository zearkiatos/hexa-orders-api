import BaseBuilder from "@Builders/baseBuilder";

class ClientBuilder extends BaseBuilder {
  private id: string;
  private username: string;
  private name: string;
  private lastname: string;
  private idNumber: string;
  constructor() {
    super();
    this.id = "1";
    this.username = "caprilespe";
    this.name = "Pedro";
    this.lastname = "Capriles";
    this.idNumber = "1111111111";
  }
}

export default ClientBuilder;
