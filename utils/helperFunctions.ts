import { Answer, MessageHeader, Question } from "../app/dnsMessage";
import type { AnswerInterface, HeaderInterface, QuestionInterface } from "../types";
import dns from 'dns';
const dnsPromises = dns.promises;

export const createHeader = (header: HeaderInterface): Uint8Array => {
    const headerObject = new MessageHeader(header);
    return headerObject.encode();
}

export const createQuestion = (questions: QuestionInterface[]): Uint8Array => {
    const questionBuffer = Buffer.concat(questions.map(e => new Question(e).encode()));
    return new Uint8Array(questionBuffer);
}

export const createAnswer = (answers: AnswerInterface[]): Uint8Array => {
    const answerBuffer = Buffer.concat(answers.map(e => new Answer(e).encode()));
    return new Uint8Array(answerBuffer);
}

export const combineSection = (arr: Uint8Array[]): Uint8Array => {
    return new Uint8Array(Buffer.concat(arr));
}

export const parseQuestion = (data: Buffer, QDCOUNT: number): QuestionInterface[] => {
    const responseQuestion: QuestionInterface[] = [];

    let offset = 12;             // Tracks the current position in the data

    for (let i = 0; i < QDCOUNT; i++) {
        let stringToReturn = "";     // Stores the domain name we're building
        let question: QuestionInterface = {
            name: "",
            type: 0,
            class: 0
        }
        while (offset < data.length) {
            const length = data[offset]; // Get the length of the next label
            if (length === 0) {          // If length is 0, it means end of the domain
                break;                   // Exit the loop
            }

            offset++;   // Move to the start of the label itself (after the length byte)

            if (length + offset > data.length) {  // Check if length goes beyond the data buffer
                break;                            // If so, stop processing
            }

            // Append the label (converted to ASCII string) and a dot (.)
            stringToReturn += data.subarray(offset, offset + length).toString("ascii") + ".";
            offset += length;  // Move the offset to the next label
        }

        // Remove the trailing dot from the final string and return it
        offset++;
        question.name = stringToReturn.slice(0, -1);
        question.type = data.readUInt16BE(offset);
        question.class = data.readUInt16BE(offset + 2);
        offset += 4;
        responseQuestion.push(question);
    }
    return responseQuestion;
}

export const parseAnswer = async (questions: QuestionInterface[]): Promise<AnswerInterface[]> => {
    const responseAnswer: AnswerInterface[] = [];
    const options = {
        family: 4,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };

    for (const q of questions) {
        let answerObject = {
            name: q.name,
            type: q.type,
            class: q.class,
            ttl: 180,
            data: ""
        }
        try {
            const res = await dnsPromises.lookup(q.name, options);
            answerObject.data = res.address;
        } catch (error) {
            console.error(`Error looking up ${q.name}:`, error);
            answerObject.data = '0.0.0.0'; // Set data to empty in case of error
        }
        responseAnswer.push(answerObject);
    }

    return responseAnswer;
}

export const createHeaderFromBuffer = (buffer: Buffer): HeaderInterface => {
    const responseHeader: HeaderInterface = {
        ID: 1234,
        QR: 1,
        OPCODE: 0,
        AA: 0,
        TC: 0,
        RD: 0,
        RA: 0,
        Z: 0,
        RCODE: 0,
        QDCOUNT: 0,
        ANCOUNT: 0,
        NSCOUNT: 0,
        ARCOUNT: 0
    }

    responseHeader.ID = buffer.readUInt16BE(0);
    responseHeader.QR = (buffer[2] >> 7) & 1;
    responseHeader.OPCODE = (buffer[2] >> 3) & 0x0f;
    // responseHeader.AA = (buffer[2] >> 2) & 1;
    responseHeader.TC = (buffer[2] >> 1) & 1;
    responseHeader.RD = buffer[2] & 1;
    responseHeader.RA = (buffer[3] >> 7) & 1;
    responseHeader.Z = (buffer[3] >> 4) & 7;
    responseHeader.RCODE = buffer[3] & 0x0f;
    responseHeader.QDCOUNT = buffer.readUInt16BE(4);
    responseHeader.ANCOUNT = buffer.readUInt16BE(6);
    // responseHeader.NSCOUNT = buffer.readUInt16BE(8);
    // responseHeader.ARCOUNT = buffer.readUInt16BE(10);

    responseHeader.QR = 1   // We are sending response
    responseHeader.RA = responseHeader.RD   // Recursion not available
    responseHeader.RCODE = responseHeader.OPCODE === 0 ? 0 : 4;
    return responseHeader;
}