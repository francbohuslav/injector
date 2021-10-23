import "reflect-metadata";
import { definitionIdentifiers } from "./annotations";
import { IBindingValues, IClass, IClassInstances, IClassTyped, IDefinitionIdentifier, ScopeEnum } from "./interfaces";
import utils from "./utils";

/**
 * Dependency injection container
 */
export class Container {
    private classInstances: IClassInstances = {};
    private bindedValues: IBindingValues = {};

    /**
     * Sets value for specific identifier
     */
    public bindValue(identifier: string, value: any) {
        this.bindedValues[identifier] = value;
    }

    /**
     * Returns instance of given class
     * @param classType Class
     */
    public resolveClass<T>(classType: IClassTyped<T>): T {
        return this.resolveInternal(classType);
    }

    public bindClass(classType: any, scope: ScopeEnum): void {
        const definition = utils.getClassDefinition(classType);
        definition.scope = scope;
    }

    private resolveInternal(classType: IClass, depth: number = 100, parentPath: string = ""): any {
        if (depth <= 0) {
            throw new Error(`Cycle detected or too much nested classes. Class path is is ${parentPath}`);
        }
        const classKey = utils.getClassKey(classType);
        const definition = definitionIdentifiers[classKey];
        if (!definition) {
            throw new Error(`Unknown class '${classType.name}'. Define some scope annotation for it. Parents are ${parentPath}`);
        }
        parentPath = classType.name + (parentPath ? ", " : "") + parentPath;
        const types: any[] = Reflect.getMetadata("design:paramtypes", classType);
        // console.log(types);
        if (!types || types.length === 0) {
            // No params
            return this.getInstance(definition, classType);
        }
        const params = types.map((type: any, position) => {
            const isClass = type != Function && type != String && type instanceof Object && type.name != "Object";
            // const isString = type == String;
            // const isFunction = type == Function;

            const injectionName = definition.parameterIdentifiers[position];
            if (injectionName !== undefined) {
                if (!Object.hasOwnProperty.call(this.bindedValues, injectionName)) {
                    throw new Error(`Injection '${injectionName}' is not set`);
                }
                return this.bindedValues[injectionName];
            }
            if (isClass) {
                return this.resolveInternal(type, depth - 1, parentPath);
            }
            throw new Error(`Injection must be defined for parameter on index ${position} of ${classType.name} constructor`);
        });
        return this.getInstance(definition, classType, params);
    }

    private getInstance(definition: IDefinitionIdentifier, classType: IClass, params: any[] = []): any {
        const classKey = utils.getClassKey(classType);
        if (definition.scope == ScopeEnum.Singleton) {
            if (!this.classInstances[classKey]) {
                this.classInstances[classKey] = {
                    instance: this.createInstance(classType, params),
                };
            }
            return this.classInstances[classKey].instance;
        } else if (definition.scope == ScopeEnum.Transient) {
            return this.createInstance(classType, params);
        }
        throw new Error(`Unknown scope '${definition.scope}'`);
    }

    private createInstance(classType: IClass, params: any[] = []): any {
        return params && params.length ? new classType(...params) : new classType();
    }
}
