import * as dgram from "dgram";
import { MessageHeader, Question } from "./dnsMessage";
import type { AnswerInterface, HeaderInterface, QuestionInterface } from "../types";
import { combineSection, createAnswer, createHeader, createHeaderFromBuffer, createQuestion, parseAnswer, parseQuestion } from "../utils/helperFunctions";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage

const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(53, "127.0.0.1");


udpSocket.on("message", async (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {

        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        // Parsing and Construct Header structure
        const requestHeader: HeaderInterface = createHeaderFromBuffer(data);
        
        // Parsing the Question and Constructing
        const responseQuestion = parseQuestion(data, requestHeader.QDCOUNT);
        
        // Modifying the Answer
        const responseAnswer: AnswerInterface[] = await parseAnswer(responseQuestion);
        
        // Convert data to binary
        requestHeader.ANCOUNT = responseQuestion.length;  //  Update the Answer count field
        const messageHeader = createHeader(requestHeader);  // converted to binary data
        const messageQuestion = createQuestion(responseQuestion);   // converted to binary data
        const  messageAnswer = createAnswer(responseAnswer);    // converted to binary data
        udpSocket.send(combineSection([messageHeader, messageQuestion, messageAnswer]), remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});