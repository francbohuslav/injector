export type IDefinitionIdentifiers = { [classKey: string]: IDefinitionIdentifier };
export type IBindingValues = { [identifier: string]: any };
export type IClass = new (...args: any[]) => any;
export type IClassTyped<T> = new (...args: any[]) => T;

export interface IDefinitionIdentifier {
    scope: ScopeEnum;
    parameterIdentifiers: string[];
    factory: () => any;
}

export enum ScopeEnum {
    Singleton,
    Transient,
    Custom,
}

export type IClassInstances = { [classKey: string]: IClassInstance };
export interface IClassInstance {
    instance: any;
}
