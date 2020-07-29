import { Context, Callback, CognitoUserPoolTriggerEvent } from "aws-lambda";

export async function handler(event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) {
    console.log("%j", event);

    const answer = event.request.challengeAnswer!;
    const correctAnswer = event.request.privateChallengeParameters!.answer;

    const response = {
        answerCorrect: answer === correctAnswer,
    };

    callback(null, { ...event, response});
}
