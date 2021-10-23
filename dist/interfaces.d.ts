export declare type IDefinitionIdentifiers = {
    [classKey: string]: IDefinitionIdentifier;
};
export declare type IBindingValues = {
    [identifier: string]: any;
};
export declare type IClass = new (...args: any[]) => any;
export declare type IClassTyped<T> = new (...args: any[]) => T;
export interface IDefinitionIdentifier {
    scope: ScopeEnum;
    parameterIdentifiers: string[];
}
export declare enum ScopeEnum {
    Singleton = 0,
    Transient = 1
}
export declare type IClassInstances = {
    [classKey: string]: IClassInstance;
};
export interface IClassInstance {
    instance: any;
}
