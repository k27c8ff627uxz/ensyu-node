## Step
1. Generate GraphQL Types
```
npm run graphql-codegen --config codegen.yml
```
2. Run GraphQL Server
```
npm start
```

## GraphQL Example

### Example1
Operation:
```
query {
  hello
  square(num: 4)
}
```

### Example2
Operation:
```
query($num: Int!) {
  hello
  square(num: $num)
}
```

Variables:
```
{
    "num": 3
}
```

### Example3
Operation:
```
mutation {
  setHello(name: "Bob")
}
```