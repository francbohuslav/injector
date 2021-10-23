"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_1 = require("./annotations");
const interfaces_1 = require("./interfaces");
class Utils {
    constructor() {
        this.defaultScope = interfaces_1.ScopeEnum.Singleton;
    }
    createDefaultClassDefinition() {
        return {
            parameterIdentifiers: [],
            scope: this.defaultScope,
        };
    }
    getClassDefinition(classType) {
        const classKey = this.getClassKey(classType);
        annotations_1.definitionIdentifiers[classKey] = annotations_1.definitionIdentifiers[classKey] || this.createDefaultClassDefinition();
        return annotations_1.definitionIdentifiers[classKey];
    }
    getClassKey(classType) {
        //TODO: BF: neco lepsiho
        return classType.name;
    }
}
exports.default = new Utils();
//# sourceMappingURL=utils.js.map