import NotFoundDTO from '@Api/Contexts/NotFound/application/DTO/notFoundDTO';

interface NotFoundImplementation {
  get(): NotFoundDTO;
}

export default NotFoundImplementation;