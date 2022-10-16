interface HealthIndicator {
  healthCheck(): Promise<boolean>;
}

export default HealthIndicator;
