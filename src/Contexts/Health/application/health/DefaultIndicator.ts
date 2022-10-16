import HealthIndicator from "@Api/Contexts/Health/application/HealthIndicator";

class DefaultIndicator implements HealthIndicator {
  healthCheck(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export default DefaultIndicator;
