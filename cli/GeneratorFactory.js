// will be used to generate CSS files from templates and take user input as well for customization


class GeneratorFactory {
  constructor() {
    this.generators = {};
  }

  registerGenerator(name, generator) {
    if (typeof generator !== 'function') {
      throw new Error('Generator must be a function');
    }
    this.generators[name] = generator;
  }

  getGenerator(name) {
    const generator = this.generators[name];
    if (!generator) {
      throw new Error(`Generator ${name} not found`);
    }
    return generator;
  }

  listGenerators() {
    return Object.keys(this.generators);
  }
}