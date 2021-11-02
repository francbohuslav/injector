# Injector

Dependency injection container for typescript

Home page: <https://github.com/francbohuslav/injector>

## Installation

```shell
npm i francbohuslav/injector
```

Add `experimentalDecorators` and `emitDecoratorMetadata` to `tsconfig.json`.

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## Quick start

File `index.ts`:

```typescript
import { MyClass } from "./my-class";
import { Container } from "injector";
const container = new Container();
const instance = container.resolveClass(MyClass);
// "Constructed by injector" in console
```

File `my-class.ts`:

```typescript
import { Inject } from "injector";

@Inject.Singleton
class MyClass {
    constructor(child: MyChildClass) {}
}

@Inject.Singleton
class MyChildClass {
    constructor() {
        console.log("Constructed by injector");
    }
}
```

## Scopes

-   `@Inject.Singleton` - creates only one instance of class
-   `@Inject.Transient` - creates new instance everytime

## Inject value

```typescript
import { Inject, Container } from "injector";

@Inject.Singleton
class Database {
    constructor(@Inject.Value("connectionString") connection: string) {}
}

const container = new Container();
container.bindValue("connectionString", "localhost:27017");
const instance = container.resolveClass(Database);
```

## Bind custom instance factory

```typescript
import { Inject, Container } from "injector";

// Singleton
const container = new Container();
const singleton = new SomeClass("some static params");
container.bindClassFactory(SomeClass, () => singleton);
const instance = container.resolveClass(SomeClass);

// Transient
const container = new Container();
container.bindClassFactory(SomeClass, () => new SomeClass("some static params"));
const instance = container.resolveClass(SomeClass);
```
