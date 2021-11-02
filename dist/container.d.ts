import "reflect-metadata";
import { IClassTyped, ScopeEnum } from "./interfaces";
/**
 * Dependency injection container
 */
export declare class Container {
    private classInstances;
    private bindedValues;
    /**
     * Sets value for specific identifier
     */
    bindValue(identifier: string, value: any): void;
    /**
     * Returns instance of given class
     * @param classType Class
     */
    resolveClass<T>(classType: IClassTyped<T>): T;
    bindClass<T>(classType: IClassTyped<T>, scope: ScopeEnum): void;
    bindClassFactory<T>(classType: IClassTyped<T>, instance: () => T): void;
    private resolveInternal;
    private getInstance;
    private createInstance;
}
