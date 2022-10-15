import config from '@Config/index';

type EntityClass = {
  new (...args: any[]): any
}

interface Injection {
  index: number
  dependency: string
}

const singletonInstances = {}

const getInstance = (type, dependency, ...args: any[]) => {
  if (dependency.singleton) {
    if (!singletonInstances.hasOwnProperty(type)) {
      /* eslint-disable @typescript-eslint/no-var-requires */
      const Class = require(dependency.instance).default
      singletonInstances[type] = new Class(...args)
    }
    return singletonInstances[type]
  } else {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const Class = require(dependency.instance).default
    return new Class(...args)
  }
}

const dependencies: any[] = config.dependencies.reduce((accum, dependency) => {
  accum[dependency.name] = {
    instance: dependency.instance,
    args: dependency.args || null,
    singleton: dependency?.singleton || false,
  }
  return accum
}, {})

const buildArgs = (dependency: any) =>
  dependency.args ? dependency.args.map((arg) => config[arg]) : []

const dependencyResolver = (type: string) => {
  const dependency: any = dependencies[type]
  const args: any[] = buildArgs(dependency)
  return getInstance(type, dependency, ...args)
}

export const Inject =
  (dependency: string) =>
  (target: Record<string, unknown>, _propertyKey: string | symbol, parameterIndex: number) => {
    const injection: Injection = { index: parameterIndex, dependency }
    const existingInjections: Injection[] = (target as any).injections || []
    Object.defineProperty(target, 'injections', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: [...existingInjections, injection],
    })
  }

export const Injection = () =>
  function injectionTarget<T extends EntityClass>(constructor: T) {
    return class extends constructor {
      constructor(..._args: any[]) {
        const injections = (constructor as any).injections as Injection[]
        const dependencies: any[] = injections
          .sort((a, b) => a.index - b.index)
          .map(({ dependency }) => dependencyResolver(dependency))
        super(...dependencies)
      }
    }
  }
