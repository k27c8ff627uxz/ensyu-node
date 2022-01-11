# Example

```
export BASE_URL=https://XXXXXXX
export EMAIL=XXXXXXX@XX.XX
export PASSWORD=XXXXXX
 
curl -X POST ${BASE_URL}/signup -d "{\"email\": \"${EMAIL}\", \"password\": \"${PASSWORD}\"}"

export CODE=XXXXXX
curl -X POST ${BASE_URL}/signupverify -d "{\"email\": \"${EMAIL}\", \"code\": \"${CODE}\"}"


curl -X POST ${BASE_URL}/login -d "{\"username\": \"${EMAIL}\", \"password\": \"${PASSWORD}\"}"

export TOKEN=XXXXXXXXXXXXXXXXXXXXXXX
curl ${BASE_URL}/apiTest -H "MyAuthorization: ${TOKEN}"
```
