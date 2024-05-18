Mutation Sample:
```
mutation {
  post(url: "myurl", description: "mydescription" ) {
    url
    description
    id
  }
}
```

Query Sample:
```
query {
  feed {
    id
    url
    description
  }
}
```
