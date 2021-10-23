import { IClass, IDefinitionIdentifier, ScopeEnum } from "./interfaces";
declare class Utils {
    defaultScope: ScopeEnum;
    createDefaultClassDefinition(): IDefinitionIdentifier;
    getClassDefinition(classType: any): IDefinitionIdentifier;
    getClassKey(classType: IClass): string;
}
declare const _default: Utils;
export default _default;
