"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definitionIdentifiers = exports.Inject = void 0;
const interfaces_1 = require("./interfaces");
const utils_1 = require("./utils");
exports.Inject = {
    Singleton: (classType) => {
        utils_1.default.getClassDefinition(classType).scope = interfaces_1.ScopeEnum.Singleton;
    },
    Transient: (classType) => {
        utils_1.default.getClassDefinition(classType).scope = interfaces_1.ScopeEnum.Transient;
    },
    Value: (injectionName) => {
        return (classType, _, position) => {
            utils_1.default.getClassDefinition(classType).parameterIdentifiers[position] = injectionName;
        };
    },
};
exports.definitionIdentifiers = {};
//# sourceMappingURL=annotations.js.map