import { Context, Callback, CognitoUserPoolTriggerEvent } from "aws-lambda";

export async function handler(event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) {
    console.log("%j", event);

    const question = parseInt(event.request.privateChallengeParameters!.question);
    const correctAnswer = `${question * question}`
    const answer = event.request.challengeAnswer!;

    const response = {
        answerCorrect: answer === correctAnswer,
    };

    callback(null, { ...event, response});
}
