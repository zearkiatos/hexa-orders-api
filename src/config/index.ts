import path from 'path';
import config from './env/config';
import { Dependency } from './dependencies';

const baseDir = path.resolve(__dirname);

const appConfigurations = Dependency.get(`${baseDir}/dependencies/configurations.${config.ENVIRONMENT}.yaml`);

export default { ...config, dependencies: appConfigurations.config.dependencies };