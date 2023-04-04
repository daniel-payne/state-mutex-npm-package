# state-mutex

## Install

**This is only a test publish, do not use yet.**

```bash
npm i @keldan-systems/state-mutex
```

The State Mutex has been tested with Create React App, however there are is still some work to do getting it ready to work with server rendered applications.

Still todo

- Extend default capture to work inside node
- Build Demo clients for Remix & Next
- Incorporate useSyncExternalStore instead of useState

## Demonstration

The video shows how the different hooks can be used to manage state

[![Demo](https://img.youtube.com/vi/Ox4755GS9xA/0.jpg)](https://www.youtube.com/watch?v=Ox4755GS9xA)

## Get Started

All of these hooks need a key to access the common storage system, in addition there can be a default value.

### useSharedState (key: string, defaultValue: StorageValue)

This hooks shares the state across all components that use it.

```typescript
const [name, setName] = useSharedState<string>("name", "Bilbo")
const [count, setCount] = useSharedState<number>("count", 44)
const [active, setActive] = useSharedState<boolean>("active", true)
```

```typescript
const defaultArray: Array<string> = ["Bilbo", "Frodo"]
const [names, setNames] = useSharedState<Array<string>>("names", defaultArray)
```

```typescript
type Person = {
  name: string
  age: number
  manager: boolean
  scores: Array<number>
}
const defaultPerson: Person = {
  name: "Dave",
  age: 44,
  manager: true,
  scores: [1, 2, 3, 4],
}
const [person, setPerson] = useSharedState<Person>("person", defaultPerson)
```

### useQueryState (key: string, defaultValue: StorageValue)

In addition to sharing the state across all components, this hook cooridnates the saving and updating of the value in the browser query string. It will proritixe the query string value over the progrmaticly assigned default value.

```typescript
const [name, setName] = useQueryState<string>("name", "Bilbo")
const [count, setCount] = useQueryState<number>("count", 44)
const [active, setActive] = useQueryState<boolean>("active", true)
```

### useHashState (key: string, defaultValue: StorageValue)

In addition to sharing the state across all components, this hook cooridnates the saving and updating of the value in the browser hash. It will proritixe the query string value over the progrmaticly assigned default value.

```typescript
const [name, setName] = useHashState<string>("name", "Bilbo")
const [count, setCount] = useHashState<number>("count", 44)
const [active, setActive] = useHashState<boolean>("active", true)
```

### useLocalState (key: string, defaultValue: StorageValue)

In addition to sharing the state across all components, this hook cooridnates the saving and updating of the value in the local storage. It will proritixe the local storage value over the progrmaticly assigned default value.

This hook is designed to be used in applications where the logic is spread across multipule browser tabs, and is a good control and command system that does away with the need for cooridnating webHooks.

```typescript
const [name, setName] = useLocalState<string>("name", "Bilbo")
const [count, setCount] = useLocalState<number>("count", 44)
const [active, setActive] = useLocalState<boolean>("active", true)
```

### useStore

This exposes the store object if you need to display it for debugging issues.
It also exposes a method for clearing the store, and resetting it to it's default values.

```typescript
const { store, clearStore } = useStore()
```

### Types

State Mutex is designed to hold Strings, Numbers and Booleans.
These can also be grouped as an Array or Record.
Dates are not supported as the cause issues in many javaScript applications. We suggest transporting dates around and storing them as ISO8601 strings

```text
YYYY-MM-HHTHH:MM:SSZ
```

e.g.

```text
2023-04-04
2023-04-04T12:02:34+00:00
2023-04-04T12:02:34Z
```

You can import any of these types for use in declaring the state hooks.

```typescript
export type BaseStorage = string | number | boolean

export type ArrayStorage = Array<BaseStorage | RecordStorage>

export type RecordStorage = { [key: string]: BaseStorage | ArrayStorage | RecordStorage | null }

export type StorageValue = BaseStorage | ArrayStorage | RecordStorage | undefined | null
```
