import { IClass, IDefinitionIdentifiers, ScopeEnum } from "./interfaces";
import utils from "./utils";

export const Inject = {
    Singleton: (classType: IClass) => {
        utils.getClassDefinition(classType).scope = ScopeEnum.Singleton;
    },

    Transient: (classType: IClass) => {
        utils.getClassDefinition(classType).scope = ScopeEnum.Transient;
    },

    Value: (injectionName: string) => {
        return (classType: IClass, _: any, position: number) => {
            utils.getClassDefinition(classType).parameterIdentifiers[position] = injectionName;
        };
    },
};

export const definitionIdentifiers: IDefinitionIdentifiers = {};
