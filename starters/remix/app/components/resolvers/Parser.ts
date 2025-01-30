import { immutableJSONPatch } from 'immutable-json-patch'
import jmespath from 'jmespath'

type ElementOperation = {
  element: string;
}

type MoveOperation = ElementOperation & {
  op: 'move';
  from: string;
  path: string
};

type ValueType = 'array' | 'object' | 'string' | 'number' | 'boolean';

type RemoveOperation = ElementOperation & {
  op: 'remove';
  path: string;
  type: ValueType;
}

type AddOperation = ElementOperation & {
  op: 'add';
  path: string;
  value: any;
  type: ValueType;
}

type CopyOperation = ElementOperation & {
  op: 'copy';
  from: string;
  path: string
};

type ProvideInverseOperations = {
  provideInverseOperations?: boolean;
}

type ParserOperationBase = ProvideInverseOperations & {
  skipIfEmpty?: boolean;
  operation: WithOperationType;
}

type Rename = ParserOperationBase & {
  operation: 'rename';
  source: string;
  destination: string;
}

type RenameProps = {
  element: string;
  operation: Omit<Rename, 'operation'>;
}

type Move = ParserOperationBase & {
  operation: 'move';
  property: string;
  destination: string;
}

type MoveProps = {
  element: string;
  operation: Omit<Move, 'operation'>;
}

type Remove = ParserOperationBase & {
  operation: 'remove';
  path: string;
  type: ValueType;
}

type RemoveProps = {
  element: string;
  operation: Omit<Remove, 'operation'>;
}

type Copy = ParserOperationBase & {
  operation: 'copy'; // @todo: remove this
  source: string;
  destination: string;
}

type CopyProps = {
  element: string;
  operation: Omit<Copy, 'operation'>;
}

type Hoist = ParserOperationBase & {
  operation: 'hoist';
  property: string;
}

type HoistProps = {
  element: string;
  operation: Omit<Hoist, 'operation'>;
}

type Add = ParserOperationBase & {
  operation: 'add';
  path: string;
  value: any;
  type: ValueType;
}

type AddProps = {
  element: string;
  operation: Omit<Add, 'operation'>;
}

type PresetTypes = 'mediaImage' | 'richText' | 'link';

type Preset = {
  skipIfEmpty?: boolean;
  preset: PresetTypes;
  property?: string;
}

type Operation = ProvideInverseOperations & (
  | MoveOperation
  | RemoveOperation
  | AddOperation
  | CopyOperation
);

type ApplyProps = {
  data: object;
  target: 'data' | 'ui';
}

type WithOperationType = 'move' | 'remove' | 'rename' | 'hoist' | 'add' | 'copy';

type ParserOperation = Move | Remove | Rename | Hoist | Add | Copy;

type WithOperation = ParserOperation & {
  operation: WithOperationType;
};

type WithOperationProps = {
  element: string;
  operations: WithOperation[];
};

type WithPresetProps = {
  element: string;
  preset: Preset;
};

type PresetProps = {
  operations: {
    element?: WithOperation[] | [];
    property?: WithOperation[] | [];
  };
  inverseOperations?: {
    element?: WithOperation[] | [];
    property?: WithOperation[] | [];
  }
}
export class Parser {
  private operations: Operation[] = [];
  public presets: Record<string, PresetProps>;
  private element: string = '/';
  private preset: PresetTypes | null;
  // private hooks: JSONPatchOptions;

  private calculateDefaultValueFromType(type: ValueType): unknown {
    if (type === 'array') {
      return [];
    }

    if (type === 'object') {
      return {};
    }

    if (type === 'string') {
      return '';
    }

    if (type === 'number') {
      return 0;
    }

    if (type === 'boolean') {
      return false;
    }

    return null;
  }

  private calculateInverseOperation(operation: Operation): Operation {

    if (operation.op === 'move') {
      const from = operation.from;
      const path = operation.path

      return {
        ...operation,
        from: path,
        path: from,
      };
    }

    if (operation.op === 'remove') {
      const path = operation.path;

      return {
        ...operation,
        op: 'add',
        path,
        value: this.calculateDefaultValueFromType(operation.type),
      };
    }

    if (operation.op === 'add') {
      const path = operation.path;

      return {
        ...operation,
        op: 'remove',
        path,
        type: operation.type
      };
    }

    throw new Error('Operation not supported at calculateInverseOperation');
  }

  private calculateInverseOperations(patches: Operation[]): Operation[] {
    const operations: Operation[] = [];
    patches
      .slice()
      .reverse()
      .forEach(operation => {

        if (operation.provideInverseOperations && this.preset) {
          const preset = this.preset;
          const elementInverseOperations = this.presets[preset].inverseOperations?.element || [];

          elementInverseOperations.forEach(inverseOperation => {
            operations.push(this.calculateOperation(operation.element, inverseOperation));
          });

          return;
        } else {
          operations.push(this.calculateInverseOperation(operation));
        }
      });

    return operations;
  }

  private calculateElement(element: string = this.element) {
    if (element === '/') {
      return '';
    }

    if (element.indexOf('[*]') > 0) {
      return element.replace('[*]', '/{INDEX}').replaceAll('.', '/');
    }

    return `${element}/{INDEX}`.replaceAll('.', '/');
  }

  private calculatePath(element: string, destination: string) {
    if (!element) {
      return `${destination}`.replaceAll('.', '/');
    }

    if (destination.startsWith('/')) {
      return `${destination}/{INDEX}`.replaceAll('.', '/');
    }

    return `${element}/${destination}`.replace('[*]', '/{INDEX}').replaceAll('.', '/');
  }

  private calculateHoistPath(element: string) {
    const lastSlashIndex = (element.endsWith('/{INDEX}') ? element.replace(/\/\{INDEX\}$/, '') : element).lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return element.substring(0, lastSlashIndex);
    }

    return element;
  }

  private applyOperations(data: object, patches: Operation[]): object {
    let currentElement = patches[0].element;
    let currentOperations: Operation[] = [];
    let updatedData = data;
    patches.forEach((operation) => {
      if (operation.element !== currentElement) {
        updatedData = immutableJSONPatch(updatedData, currentOperations)
        currentElement = operation.element;
        currentOperations = [];
      }
      const element = operation.element.substring(1);
      const elementData = element ? jmespath.search(updatedData, element) : null;
      if (elementData && Array.isArray(elementData) && elementData.length > 0) {
        elementData.forEach((_, index) => {
          if (operation.op === 'move') {
            currentOperations.push({
              ...operation,
              from: operation.from.replaceAll('{INDEX}', index.toString()),
              path: operation.path.replaceAll('{INDEX}', index.toString()),
            });
          }

          if (operation.op === 'remove') {
            currentOperations.push({
              ...operation,
              path: operation.path.replaceAll('{INDEX}', index.toString()),
            });
          }

          if (operation.op === 'add') {
            currentOperations.push({
              ...operation,
              path: operation.path.replaceAll('{INDEX}', index.toString()),
            });
          }
        });

        return;
      }

      if (operation.op === 'move') {
        currentOperations.push({
          ...operation,
          from: operation.from.replaceAll('{INDEX}/', ''),
          path: operation.path.replaceAll('{INDEX}/', ''),
        });
      }

      if (operation.op === 'remove') {
        currentOperations.push({
          ...operation,
          path: operation.path.replaceAll('{INDEX}/', ''),
        });
      }

      if (operation.op === 'add') {
        currentOperations.push({
          ...operation,
          path: operation.path.replaceAll('{INDEX}/', ''),
        });
      }
    })

    if (!updatedData) {
      return data;
    }

    return immutableJSONPatch(updatedData, currentOperations);
  }

  constructor() {
    this.operations = [];
    this.element = '/';
    this.preset = null;
    this.presets = {
      mediaImage: {
        operations: {
          property: [
            { operation: 'rename', source: 'url', destination: 'src' },
            { operation: 'hoist', property: 'src' },
            { operation: 'hoist', property: 'alt' },
            { operation: 'hoist', property: 'height' },
            { operation: 'hoist', property: 'width' },
          ],
          element: [
            { operation: 'remove', path: 'mediaImage', type: 'object' },
          ]
        },
      },
      link: {
        operations: {
          element: [
            { operation: 'rename', source: 'url', destination: 'href' },
            { operation: 'rename', source: 'title', destination: 'text' },
          ],
        },
      },
      richText: {
        operations: {
          element: [
            { operation: 'rename', source: 'answer.value', destination: 'answer', provideInverseOperations: true },
          ],
        },
        inverseOperations: {
          element: [
            { operation: 'rename', source: 'answer', destination: 'answer_temp' },
            { operation: 'add', path: 'answer', type: 'object', value: {} },
            { operation: 'rename', source: 'answer_temp', destination: 'answer.value' },
          ],
        }
      }
    } as const

    // this.hooks = {
    //   before: (document: unknown, operation: JSONPatchOperation) => {
    //     console.log('before operation', { document, operation })
    //     // return document | undefined    
    //   },

    //   after: (document: unknown, operation: JSONPatchOperation, previousDocument: unknown) => {
    //     console.log('after operation', { document, operation, previousDocument })
    //     // return document | undefined
    //   }
    // }
  }

  private rename({ element, operation: { source, destination, provideInverseOperations = false } }: RenameProps): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      element,
      op: 'move',
      from: `${calculatedElement}/${source.replaceAll('.', '/')}`,
      path: `${calculatedElement}/${destination.replaceAll('.', '/')}`,
    }
  }

  private move({
    element,
    operation: { destination, property, provideInverseOperations = false } }: MoveProps): Operation {
    const calculatedElement = this.calculateElement(element);
    const calculatedPath = this.calculatePath(calculatedElement, destination);

    return {
      provideInverseOperations,
      element,
      op: 'move',
      from: `${calculatedElement}/${property}`,
      path: `${calculatedPath}/${property}`,
    };
  }

  private remove({ element, operation: { path, type, provideInverseOperations = false } }: RemoveProps): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      element,
      op: 'remove',
      path: this.calculatePath(calculatedElement, path),
      type,
    }
  }

  private copy({ element, operation: { source, destination, provideInverseOperations = false } }: CopyProps): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      element: element,
      op: 'copy',
      from: `${calculatedElement}/${source.replaceAll('.', '/')}`,
      path: `${calculatedElement}/${destination.replaceAll('.', '/')}`,
    };
  }

  private hoist({ element, operation: { property, provideInverseOperations = false } }: HoistProps): Operation {
    const calculatedElement = this.calculateElement(element);
    // @todo: throw error if calculatedElement is empty

    return {
      provideInverseOperations,
      element,
      op: 'move',
      from: `${calculatedElement}/${property}`,
      path: `${this.calculateHoistPath(calculatedElement)}/${property}`,
    };
  }

  private add({ element, operation: { path, value, type, provideInverseOperations = false } }: AddProps): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      element: element,
      op: 'add',
      path: this.calculatePath(calculatedElement, path),
      value,
      type,
    };
  }

  private calculateOperation(element: string, operation: WithOperation): Operation {
    const { provideInverseOperations = false } = operation;
    if (operation.operation === 'rename') {
      return this.rename({
        element,
        operation: {
          ...operation,
          provideInverseOperations,
        }
      })
    }

    if (operation.operation === 'move') {
      return this.move({
        element,
        operation: {
          ...operation,
          provideInverseOperations,
        }
      })
    }

    if (operation.operation === 'remove') {
      return this.remove({
        element,
        operation: {
          ...operation,
          provideInverseOperations,
        }
      })
    }

    if (operation.operation === 'copy') {
      return this.copy({
        element,
        operation: {
          ...operation,
          provideInverseOperations,
        }
      })
    }

    if (operation.operation === 'hoist') {
      return this.hoist({
        element,
        operation: {
          ...operation,
          provideInverseOperations,
        }
      })
    }

    if (operation.operation === 'add') {
      return this.add({
        element: this.element,
        operation: {
          ...operation,
          provideInverseOperations,
        }
      })
    }

    throw new Error('Operation not supported at calculateOperation');
  }

  public with({ element, operations }: WithOperationProps): this
  public with({ element, preset }: WithPresetProps): this

  public with(args: WithOperationProps | WithPresetProps) {
    this.element = args.element;
    if ('operations' in args) {
      const operations = args.operations;
      operations.forEach(operation => {
        this.operations.push(this.calculateOperation(args.element, operation));
      });
    }

    if ('preset' in args) {
      const { preset, property } = args.preset;
      this.preset = preset;
      const element = args.element;
      const elementOperations = this.presets[preset].operations.element || [];
      const propertyOperations = this.presets[preset].operations.property || [];

      // @todo: apply update of placeholder for property 
      if (propertyOperations.length > 0 && property) {
        this.with({
          element: `${element}.${property}`,
          operations: propertyOperations,
        });
      }

      // @todo: apply update of placeholder for property 
      if (elementOperations.length > 0) {
        this.with({
          element,
          operations: elementOperations,
        });
      }
    }

    return this;
  }

  apply({ data, target }: ApplyProps): object {

    if (!data || !target) {
      return {};
    }

    const puckOperations: Operation[] = [
      {
        element: '/',
        op: 'remove',
        path: '/puck',
        type: 'object',
      },
      {
        element: '/',
        op: 'remove',
        path: '/editMode',
        type: 'boolean'
      }
    ]

    if (target === 'ui') {
      try {
        const updatedJson = this.applyOperations(data, this.operations);

        return immutableJSONPatch(updatedJson, puckOperations)
      }
      catch (error) {
        console.error('error:', error)
      }
    }

    if (target === 'data') {
      try {
        const inverseOperations = this.calculateInverseOperations(this.operations);
        const updatedJson = this.applyOperations(
          data,
          inverseOperations,
        );

        return updatedJson;
      }
      catch (error) {
        console.error('error:', error)
      }
    }

    return {}
  }
}
