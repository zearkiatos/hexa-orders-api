interface Database {
  connection(): Promise<boolean>;

  close(): Promise<boolean>;
}

export default Database;
