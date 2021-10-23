export type IDefinitionIdentifiers = { [classKey: string]: IDefinitionIdentifier };
export type IBindingValues = { [identifier: string]: any };
export type IClass = new (...args: any[]) => any;
export type IClassTyped<T> = new (...args: any[]) => T;
export interface IDefinitionIdentifier {
    scope: ScopeEnum;
    parameterIdentifiers: string[];
}

export enum ScopeEnum {
    Singleton,
    Transient,
}

export type IClassInstances = { [classKey: string]: IClassInstance };
export interface IClassInstance {
    instance: any;
}
