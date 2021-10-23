import { IClass, IDefinitionIdentifiers } from "./interfaces";
export declare const Inject: {
    Singleton: (classType: IClass) => void;
    Transient: (classType: IClass) => void;
    Value: (injectionName: string) => (classType: IClass, _: any, position: number) => void;
};
export declare const definitionIdentifiers: IDefinitionIdentifiers;
