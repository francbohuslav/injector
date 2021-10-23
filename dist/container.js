"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
require("reflect-metadata");
const annotations_1 = require("./annotations");
const interfaces_1 = require("./interfaces");
const utils_1 = require("./utils");
/**
 * Dependency injection container
 */
class Container {
    constructor() {
        this.classInstances = {};
        this.bindedValues = {};
    }
    /**
     * Sets value for specific identifier
     */
    bindValue(identifier, value) {
        this.bindedValues[identifier] = value;
    }
    /**
     * Returns instance of given class
     * @param classType Class
     */
    resolveClass(classType) {
        return this.resolveInternal(classType);
    }
    bindClass(classType, scope) {
        const definition = utils_1.default.getClassDefinition(classType);
        definition.scope = scope;
    }
    resolveInternal(classType, depth = 100, parentPath = "") {
        if (depth <= 0) {
            throw new Error(`Cycle detected or too much nested classes. Last class is ${classType.name}`);
        }
        const classKey = utils_1.default.getClassKey(classType);
        const definition = annotations_1.definitionIdentifiers[classKey];
        if (!definition) {
            throw new Error(`Unknown class '${classType.name}'. Define some scope annotation for it. Path ${parentPath}`);
        }
        parentPath = classType.name + (parentPath ? ", " : "") + parentPath;
        const types = Reflect.getMetadata("design:paramtypes", classType);
        // console.log(types);
        if (!types || types.length === 0) {
            // No params
            return this.getInstance(definition, classType);
        }
        const params = types.map((type, position) => {
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
    getInstance(definition, classType, params = []) {
        const classKey = utils_1.default.getClassKey(classType);
        if (definition.scope == interfaces_1.ScopeEnum.Singleton) {
            if (!this.classInstances[classKey]) {
                this.classInstances[classKey] = {
                    instance: this.createInstance(classType, params),
                };
            }
            return this.classInstances[classKey].instance;
        }
        else if (definition.scope == interfaces_1.ScopeEnum.Transient) {
            return this.createInstance(classType, params);
        }
        throw new Error(`Unknown scope '${definition.scope}'`);
    }
    createInstance(classType, params = []) {
        return params ? new classType(...params) : new classType();
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map