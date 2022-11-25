import fs from 'fs';
import YAML from 'yaml';
abstract class YamlUtils {
  static parse(path): any {
    const file: string = fs.readFileSync(path, 'utf8');
    const jsonObject: any = YAML.parse(file);

    return jsonObject;
  }
}

export { YamlUtils };
