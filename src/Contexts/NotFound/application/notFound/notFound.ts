import NotFoundImplementation from "@Api/Contexts/NotFound/application/notFoundImplementation";
import NotFoundDTO from "@Api/Contexts/NotFound/application/DTO/notFoundDTO";

class NotFound implements NotFoundImplementation {
  get(): NotFoundDTO {
    const response: NotFoundDTO = {
      message: "Route not found 🤯",
    };

    return response;
  }
}

export default NotFound;
