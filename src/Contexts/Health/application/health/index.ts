import Service from "@Api/Contexts/Shared/application/Service";
import HealthIndicator from "@Api/Contexts/Health/application/HealthIndicator";
import DefaultIndicator from "@Api/Contexts/Health/application/health/DefaultIndicator";

class Health implements Service {
  private checks: HealthIndicator[] = [];

  constructor() {
    this.checks.push(new DefaultIndicator());
  }

  async run(): Promise<any> {
    const results: boolean[] = await Promise.all(
      this.checks.map((check) => check.healthCheck())
    );
    const isHealthy = results.every(Boolean);
    return isHealthy;
  }
}

export default Health;
