import { MessageHeader, Question } from "../app/dnsMessage";
import type { HeaderInterface, QuestionInterface } from "../types";

export const createHeader = (header:  HeaderInterface) : Uint8Array => {
    const headerObject = new MessageHeader(header);
    return headerObject.encode();
}

export const createQuestion = (questions: QuestionInterface[]) :  Uint8Array => {
    const questionBuffer = Buffer.concat(questions.map(e => new Question(e).encode()));
    return new Uint8Array(questionBuffer);
}

export const combineSection = (arr: Uint8Array[]) :  Uint8Array => {
    return new Uint8Array(Buffer.concat(arr));
}