interface Database {
  connection(): Promise<boolean | void>;

  close(): Promise<boolean | void>;

  getDatabaseContext():any;
}

export default Database;
