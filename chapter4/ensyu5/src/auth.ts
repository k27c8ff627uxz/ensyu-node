import { Context, APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerCallback } from "aws-lambda";

export function handler(event: APIGatewayTokenAuthorizerEvent, context: Context, callback: APIGatewayAuthorizerCallback) {
    console.log(JSON.stringify(event));
    const token = event.authorizationToken;
    
    switch (token) {
        case 'allow':
          // API へのリクエストを許可する
          context.succeed(generatePolicy('user', 'Allow', event.methodArn));
          break;
        case 'deny':
          // API へのリクエストを拒否する
          context.succeed(generatePolicy('user', 'Deny', event.methodArn));
          break;
        case 'unauthorized':
          // 評価に値しない場合など
          context.fail("Unauthorized");
          break;
        default:
          // エラー
          context.fail("error");
      }
}


function generatePolicy(principalId, effect, resource) {
    return {
      principalId: principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }]
      }
    };
  }