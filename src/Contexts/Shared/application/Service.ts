interface Service {
    [x: string]: any;
    run(DTO?): Promise<any>
  }
  
  export default Service;