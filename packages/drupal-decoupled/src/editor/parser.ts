import { immutableJSONPatch, JSONPatchOperation } from 'immutable-json-patch'
import jmespath from 'jmespath'

type ElementOperation = {
  element: string;
  skipOnNull?: boolean;
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

type InverseOperationsBase = {
  provideInverseOperations?: boolean;
  inverseOperations?: PresetOperation[];
}

type ParserOperationBase = InverseOperationsBase & {
  skipOnNull?: boolean;
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
  operation: 'copy';
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

export type Preset = {
  skipOnNull?: boolean;
  preset: PresetTypes;
  property?: string;
}

type Operation = InverseOperationsBase & (
  | MoveOperation
  | RemoveOperation
  | AddOperation
  | CopyOperation
);

type ApplyProps = {
  data: object;
  mode: 'default' | 'inverse';
}

type WithOperationType = 'move' | 'remove' | 'rename' | 'hoist' | 'add' | 'copy';

type ParserOperation = Move | Remove | Rename | Hoist | Add | Copy;

type WithOperation = ParserOperation & {
  operation: WithOperationType;
};

export type WithOperationProps = {
  element: string;
  operations: WithOperation[];
  inverseOperations?: WithOperation[];
};

export type WithPresetProps = {
  element: string;
  preset: Preset;
};

type PresetOperation = {
  element: string;
  operations: WithOperation[];
}

type PresetProps = {
  operations: PresetOperation[];
  inverseOperations?: PresetOperation[];
}
export class Parser {
  private operations: Operation[] = [];
  public presets: Record<string, PresetProps>;
  private element: string = '/';

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
        // @todo: confirm if we need to validate if the operation is a preset using "preset"
        if (operation.provideInverseOperations) {
          const inverseOperations = operation.inverseOperations;

          if (!inverseOperations || inverseOperations.length === 0) {
            return;
          }

          inverseOperations.forEach((inverseOperation) => {
            inverseOperation.operations.forEach((inverseOperationElement) => {
              operations.push(this.calculateOperation(operation.element, inverseOperationElement));
            });

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

    const options = {
      before: (document: unknown, operation: JSONPatchOperation) => {
        // @ts-expect-error expect error.
        const { element } = operation;
        // @ts-expect-error expect error.
        if (operation.skipOnNull) {
          const path = element.substring(1)
          const isValid = jmespath.search(document, path) !== null;
          if (!isValid) {
            operation = { op: 'add', path: element, value: undefined };
          }
        }

        return { document, operation };
      }
    }

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

    return immutableJSONPatch(updatedData, currentOperations, options);
  }

  constructor() {
    this.operations = [];
    this.element = '/';
    this.presets = {
      mediaImage: {
        operations: [
          {
            element: '{element}.{property}',
            operations: [
              { operation: 'rename', source: 'url', destination: 'src' },
              { operation: 'hoist', property: 'src' },
              { operation: 'hoist', property: 'alt' },
              { operation: 'hoist', property: 'height' },
              { operation: 'hoist', property: 'width' },
            ]
          },
          {
            element: '{element}',
            operations: [
              // @todo: rename path: 'mediaImage' to path: "{property}"
              { operation: 'remove', path: 'mediaImage', type: 'object' },
            ]
          },
        ],
      },
      link: {
        operations: [
          {
            element: '{element}',
            operations: [
              { operation: 'rename', source: 'url', destination: 'href' },
              { operation: 'rename', source: 'title', destination: 'text' },
            ]
          }
        ]
      },
      richText: {
        operations: [
          {
            element: '{element}',
            operations: [
              // @todo: rename: instances of 'answer' to '{property}'
              { operation: 'rename', source: 'answer.value', destination: 'answer', provideInverseOperations: true },
            ],
          },
        ],
        inverseOperations: [
          {
            element: '{element}',
            operations: [
              // @todo: rename: instances of 'answer' to '{property}'
              { operation: 'rename', source: 'answer', destination: 'answer_temp' },
              { operation: 'add', path: 'answer', type: 'object', value: {} },
              { operation: 'rename', source: 'answer_temp', destination: 'answer.value' },
            ],
          },
        ],
      }
    }
  }

  private rename(
    {
      element,
      operation: {
        source,
        destination,
        provideInverseOperations = false,
        inverseOperations = [],
        skipOnNull = false,
      }
    }: RenameProps
  ): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      inverseOperations,
      skipOnNull,
      element,
      op: 'move',
      from: `${calculatedElement}/${source.replaceAll('.', '/')}`,
      path: `${calculatedElement}/${destination.replaceAll('.', '/')}`,
    }
  }

  private move(
    {
      element,
      operation: {
        destination,
        property,
        provideInverseOperations = false,
        inverseOperations = [],
        skipOnNull = false
      }
    }:
      MoveProps
  ): Operation {
    const calculatedElement = this.calculateElement(element);
    const calculatedPath = this.calculatePath(calculatedElement, destination);

    return {
      provideInverseOperations,
      inverseOperations,
      skipOnNull,
      element,
      op: 'move',
      from: `${calculatedElement}/${property}`,
      path: `${calculatedPath}/${property}`,
    };
  }

  private remove(
    {
      element,
      operation: {
        path,
        type,
        provideInverseOperations = false,
        inverseOperations = [],
        skipOnNull = false,
      }
    }: RemoveProps
  ): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      inverseOperations,
      skipOnNull,
      element,
      op: 'remove',
      path: this.calculatePath(calculatedElement, path),
      type,
    }
  }

  private copy(
    {
      element, operation: {
        source,
        destination,
        provideInverseOperations = false,
        inverseOperations = [],
        skipOnNull = false
      }
    }: CopyProps
  ): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      inverseOperations,
      skipOnNull,
      element: element,
      op: 'copy',
      from: `${calculatedElement}/${source.replaceAll('.', '/')}`,
      path: `${calculatedElement}/${destination.replaceAll('.', '/')}`,
    };
  }

  private hoist(
    {
      element, operation: {
        property,
        provideInverseOperations = false,
        inverseOperations = [],
        skipOnNull = false
      }
    }: HoistProps
  ): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      inverseOperations,
      skipOnNull,
      element,
      op: 'move',
      from: `${calculatedElement}/${property}`,
      path: `${this.calculateHoistPath(calculatedElement)}/${property}`,
    };
  }

  private add(
    {
      element,
      operation: {
        path,
        value,
        type,
        provideInverseOperations = false,
        inverseOperations = [],
        skipOnNull = false,
      }
    }: AddProps
  ): Operation {
    const calculatedElement = this.calculateElement(element);

    return {
      provideInverseOperations,
      inverseOperations,
      skipOnNull,
      element: element,
      op: 'add',
      path: this.calculatePath(calculatedElement, path),
      value,
      type,
    };
  }

  private calculateOperation(element: string, operation: WithOperation): Operation {
    if (operation.operation === 'rename') {
      return this.rename({
        element,
        operation,
      })
    }

    if (operation.operation === 'move') {
      return this.move({
        element,
        operation,
      })
    }

    if (operation.operation === 'remove') {
      return this.remove({
        element,
        operation,
      })
    }

    if (operation.operation === 'copy') {
      return this.copy({
        element,
        operation,
      })
    }

    if (operation.operation === 'hoist') {
      return this.hoist({
        element,
        operation,
      })
    }

    if (operation.operation === 'add') {
      return this.add({
        element: this.element,
        operation,
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
      const { preset, property, skipOnNull = false } = args.preset;
      const element = args.element;
      const presetOperations = this.presets[preset].operations || [];
      const inverseOperations = this.presets[preset].inverseOperations?.map(inverseOperation => {
        return {
          element: inverseOperation.element.replaceAll('{element}', element).replaceAll('{property}', property || ''),
          operations: inverseOperation.operations.map(operation => {
            return {
              ...operation,
              ...{ skipOnNull },
              ...{ inverseOperations: [] }
            }
          }),
        }
      });

      if (presetOperations.length > 0) {
        presetOperations.forEach(presetOperation => {
          this.with({
            element: presetOperation.element.replaceAll('{element}', element).replaceAll('{property}', property || ''),
            operations: presetOperation.operations.map(operation => {
              return {
                // @todo: apply update of placeholder for element and property 
                ...operation,
                ...{ skipOnNull },
                ...{ inverseOperations },
              }
            }),
          });
        });
      }
    }

    return this;
  }

  apply({ data, mode }: ApplyProps): object {
    if (!data || !mode) {
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
    ];

    if (mode === 'default') {
      try {
        const updatedJson = this.applyOperations(data, this.operations);

        return immutableJSONPatch(updatedJson, puckOperations)
      }
      catch (error) {
        console.error('error:', error)
      }
    }

    if (mode === 'inverse') {
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

  getOperations(): Operation[] {
    return this.operations;
  }
}
