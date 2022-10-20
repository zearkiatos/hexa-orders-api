interface Database {
  connection(): Promise<boolean>;

  close(): Promise<boolean>;

  getDatabaseContext():any;
}

export default Database;
