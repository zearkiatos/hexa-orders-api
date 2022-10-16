import Service from "@Api/Contexts/Shared/application/Service";
import NotFoundDTO from "@Api/Contexts/NotFound/application/DTO/notFoundDTO";
import NotFoundApplication from "@Api/Contexts/NotFound/application/notFound/notFound";
class NotFound implements Service {
  private notFoundApplication;
  constructor() {
    this.notFoundApplication = new NotFoundApplication();
  }
  async run(): Promise<NotFoundDTO> {
    const response: NotFoundDTO = this.notFoundApplication.get();
    return Promise.resolve(response);
  }
}

export default NotFound;
