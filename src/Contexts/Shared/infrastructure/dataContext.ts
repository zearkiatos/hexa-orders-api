class DataContext {
  private static context: any;
  static setContext(context: any): void {
    DataContext.context = context;
  }
  static getContext(): any {
    return DataContext.context;
  }
}

export default DataContext;
