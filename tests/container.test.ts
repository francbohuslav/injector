import { Inject } from "../src/annotations";
import { Container } from "../src/container";
import { ScopeEnum } from "../src/interfaces";

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
