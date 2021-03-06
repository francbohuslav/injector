import { Inject } from "../src/annotations";
import { Container } from "../src/container";
import { ScopeEnum } from "../src/interfaces";
import utils from "../src/utils";
import { DeepClass101 } from "./deep-classes";

describe("Container resolving", () => {
    test("class tree", () => {
        const container = new Container();
        const instance = container.resolveClass(GrandParent);
        expect(instance).toBeTruthy();
        expect(instance.parent).toBeTruthy();
        expect(instance.parent.child).toBeTruthy();
        expect(instance.parent.child).toBe(instance.parent.anotherChild);
    });

    test("singleton", () => {
        const container = new Container();
        const instance1 = container.resolveClass(Child);
        const instance2 = container.resolveClass(Child);
        expect(instance1).toBe(instance2);
    });

    test("transient", () => {
        const container = new Container();
        const instance1 = container.resolveClass(Transient);
        const instance2 = container.resolveClass(Transient);
        expect(instance1).not.toBe(instance2);
    });

    test("scope change", () => {
        const container = new Container();
        container.bindClass(Child, ScopeEnum.Transient);
        let instance1 = container.resolveClass(Child);
        let instance2 = container.resolveClass(Child);
        expect(instance1).not.toBe(instance2);

        container.bindClass(Child, ScopeEnum.Singleton);
        instance1 = container.resolveClass(Child);
        instance2 = container.resolveClass(Child);
        expect(instance1).toBe(instance2);
    });

    test("value resolving", () => {
        const container = new Container();
        container.bindValue("connection", "db:localhost");
        const instance = container.resolveClass(Database);
        expect(instance.connection).toBe("db:localhost");
    });

    test("bind instance", () => {
        const container = new Container();
        const singleInstance = new ThirdParthClass("db:localhost");
        container.bindClassFactory(ThirdParthClass, () => singleInstance);
        const instance = container.resolveClass(UsesTPClass);
        expect(instance.tpInstance.someValue).toBe("db:localhost");
    });
});

describe("Errors", () => {
    test("unknown class", () => {
        const container = new Container();
        expect(() => container.resolveClass(NotAnnotatedClass)).toThrow(/Unknown class/);
    });

    test("too deep", () => {
        const container = new Container();
        expect(() => container.resolveClass(DeepClass101)).toThrow(/Cycle detected/);
    });

    test("not value set", () => {
        const container = new Container();
        expect(() => container.resolveClass(Database)).toThrow(/Injection .* is not set/);
    });

    test("injection not defined", () => {
        const container = new Container();
        expect(() => container.resolveClass(InjectionMustBeDefined)).toThrow(/Injection must be defined/);
    });

    test("unknown scope", () => {
        const container = new Container();
        utils.getClassDefinition(Child).scope = "dsfd" as any;
        expect(() => container.resolveClass(Parent)).toThrow(/Unknown scope/);
    });
});

@Inject.Singleton
class Child {
    constructor() {
        console.log("Generating child");
    }
}

@Inject.Singleton
class Parent {
    constructor(public child: Child, public anotherChild: Child) {}
}

@Inject.Singleton
class GrandParent {
    constructor(public parent: Parent) {}
}

@Inject.Singleton
class Database {
    constructor(@Inject.Value("connection") public connection: string) {}
}

class NotAnnotatedClass {}

@Inject.Singleton
class InjectionMustBeDefined {
    constructor(public connection: string) {}
}

@Inject.Transient
class Transient {
    constructor(public child: Child, public anotherChild: Child) {}
}

class ThirdParthClass {
    constructor(public someValue: string) {}
}

@Inject.Singleton
class UsesTPClass {
    constructor(public tpInstance: ThirdParthClass) {}
}
