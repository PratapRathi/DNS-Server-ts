import * as dgram from "dgram";
import { MessageHeader, Question } from "./dnsMessage";
import type { HeaderInterface, QuestionInterface } from "../types";
import { combineSection, createHeader, createQuestion } from "../utils/helperFunctions";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage

const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

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

const responseQuestion: QuestionInterface[] = [{
    name: "codecrafters.io",
    type: 1,
    class: 1
}]

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {

        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);

        responseHeader.QDCOUNT = responseQuestion.length;
        const messageHeader = createHeader(responseHeader);

        const messageQuestion = createQuestion(responseQuestion);

        udpSocket.send(combineSection([messageHeader,messageQuestion]), remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});