interface Infrastructure {
  start(): Promise<void> | void;
  stop(): Promise<void> | void;
}

export default Infrastructure;
