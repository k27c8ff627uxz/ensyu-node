# Example

```
export BASE_URL=https://XXXXXXX
export EMAIL=XXXXXXX@XX.XX
export PASSWORD=XXXXXXXX
 
curl -X POST ${BASE_URL}/signup -d "{\"email\": \"${EMAIL}\", \"password\": \"${PASSWORD}\"}"

export CODE=XXXXXX
curl -X POST ${BASE_URL}/signupverify -d "{\"email\": \"${EMAIL}\", \"code\": \"${CODE}\"}"

curl -X POST ${BASE_URL}/question -d "{\"username\": \"${EMAIL}\"}"

export SESSION=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export ANSWER=XX
curl -X POST ${BASE_URL}/answer -d "{\"username\": \"${EMAIL}\", \"session\": \"${SESSION}\", \"answer\": \"${ANSWER}\"}"

export TOKEN=XXXXXXXXXXXXXXXXXXXXXXX
curl ${BASE_URL}/apiTest -H "MyAuthorization: ${TOKEN}"
```
