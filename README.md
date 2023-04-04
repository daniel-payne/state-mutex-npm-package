# state-mutex

# This is only a test publish, do not use yet.

## Demonstration

[![Demo](https://i9.ytimg.com/vi_webp/Ox4755GS9xA/mq2.webp?sqp=CPijr6EG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBMgQih_MA8=&rs=AOn4CLCIrSzuyrrQcJczxElJayjgwy9qfg)](https://www.youtube.com/watch?v=Ox4755GS9xA)

## Get Started

### useSharedState(key: string, defaultValue: StorageValue)

```typescript
const [name, setName] = useSharedState<string>('name', 'Bilbo')
const [count, setCount] = useSharedState<number>('count', 44)
const [active, setActive] = useSharedState<boolean>('active', true)

const [names, setNames] = useSharedState<Array<string>>('names', ['Bilbo','Frodo'])

type Person = {
  name: string,
  age: number,
  manager: boolean,
  scores: Array<number>
}
const defaultPerson: Person = {
  name: 'Dave',
  age: 44,
  manager: true,
  scores: [1,2,3,4]
}
const [person, setPerson] = useSharedState<Person>('person', defaultPerson)
```

### useQueryState

### useHashState

### useLocalState

### useStore

### clearStore()

### StorageValue


