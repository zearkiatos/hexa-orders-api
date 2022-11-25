import { YamlUtils } from "@Utils/yamlUtils";

abstract class Dependency {
  static get(path) {
    const dependencies = YamlUtils.parse(path);

    return dependencies;
  }
}

export { Dependency };
