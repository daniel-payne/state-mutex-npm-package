# state-mutex

## WHY use this package

### If you want to write one liner state management control code.

I have tried all the other state management techniques, and they are too complex for simple UI management and too simple for business management logic. I want simple one-liner state management for my UI and keep all the complex business logic in a database, where it belongs.

### If you want to share state via an email.

I often need users to email support issues in, and when I keep the state in the URL. The users can send me that text and I can put my browser into the same state with a simple cut & paste.

### If you want to share state across browser tabs. 

I am often writing complex financial management application that are spread across several screens. I need those screens to share state, so that one can act as a control window and another can display detailed information. I don't want to use a server to orchestrate the communication between the windows.

## Demonstration

[![Demo](https://img.youtube.com/vi/Fvof3an8pqU/0.jpg)](https://www.youtube.com/watch?v=Fvof3an8pqU)

The video shows how the different hooks can be used to manage state

## Install

```bash
npm i @keldan-systems/state-mutex
```

The State Mutex has been tested with Create React App and RemixJS.

With Remix you will need to add this to your **remix.config.js**

```typescript
serverDependenciesToBundle: ["@keldan-systems/state-mutex"],
```

## Get Started

All of these hooks need a key to access the common storage system, in addition there can be a default value.

### useSharedState (key: string, defaultValue: StorageValue)

This hooks shares the state across all components that use it.

```typescript
import { useSharedState } from "@keldan-systems/state-mutex"

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

In addition to sharing the state across all components, this hook coordinates the saving and updating of the value in the browser query string. It will prioritize the query string value over the programmatically assigned default value.

```typescript
import { useQueryState } from "@keldan-systems/state-mutex"

const [name, setName] = useQueryState<string>("name", "Bilbo")
const [count, setCount] = useQueryState<number>("count", 44)
const [active, setActive] = useQueryState<boolean>("active", true)
```

### useHashState (key: string, defaultValue: StorageValue)

In addition to sharing the state across all components, this hook coordinates the saving and updating of the value in the browser hash. It will prioritize the query string value over the programmatically assigned default value.

```typescript
import { useHashState } from "@keldan-systems/state-mutex"

const [name, setName] = useHashState<string>("name", "Bilbo")
const [count, setCount] = useHashState<number>("count", 44)
const [active, setActive] = useHashState<boolean>("active", true)
```

### useLocalState (key: string, defaultValue: StorageValue)

In addition to sharing the state across all components, this hook coordinates the saving and updating of the value in the local storage. It will prioritize the local storage value over the programmatically assigned default value.

This hook is designed to be used in applications where the logic is spread across multiple browser tabs, and is a good control and command system that does away with the need for coordinating webHooks.

```typescript
import { useLocalState } from "@keldan-systems/state-mutex"

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
import type { BaseStorage, ArrayStorage, RecordStorage, StorageValue } from "@keldan-systems/state-mutex"
```

based on these definitions

```typescript
export type BaseStorage = string | number | boolean

export type ArrayStorage = Array<BaseStorage | RecordStorage>

export type RecordStorage = { [key: string]: BaseStorage | ArrayStorage | RecordStorage | null }

export type StorageValue = BaseStorage | ArrayStorage | RecordStorage | undefined | null
```
