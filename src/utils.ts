import { definitionIdentifiers } from "./annotations";
import { IClass, IDefinitionIdentifier, ScopeEnum } from "./interfaces";

class Utils {
    public defaultScope: ScopeEnum = ScopeEnum.Singleton;

    public createDefaultClassDefinition(): IDefinitionIdentifier {
        return {
            parameterIdentifiers: [],
            scope: this.defaultScope,
            factory: null,
        };
    }

    public getClassDefinition(classType: any): IDefinitionIdentifier {
        const classKey = this.getClassKey(classType);
        definitionIdentifiers[classKey] = definitionIdentifiers[classKey] || this.createDefaultClassDefinition();
        return definitionIdentifiers[classKey];
    }
    public getClassKey(classType: IClass): string {
        //TODO: BF: neco lepsiho
        return classType.name;
    }
}

export default new Utils();
