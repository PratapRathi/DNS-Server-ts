import type { HeaderInterface, QuestionInterface } from "../types";

export class MessageHeader {
    ID: number;
    QR: number;
    OPCODE: number;
    AA: number;
    TC: number;
    RD: number;
    RA: number;
    Z: number;
    RCODE: number;
    QDCOUNT: number;
    ANCOUNT: number;
    NSCOUNT: number;
    ARCOUNT: number;

    constructor(header : HeaderInterface) {
        this.ID = header.ID;
        this.QR = header.QR;
        this.OPCODE = header.OPCODE;
        this.AA = header.AA;
        this.TC = header.TC;
        this.RD = header.RD;
        this.RA = header.RA;
        this.Z = header.Z;
        this.RCODE = header.RCODE;
        this.QDCOUNT = header.QDCOUNT;
        this.ANCOUNT = header.ANCOUNT;
        this.NSCOUNT = header.NSCOUNT;
        this.ARCOUNT = header.ARCOUNT;
    }

    encode(): Uint8Array {
        const buffer = Buffer.alloc(12);
        let offset = 0;
        buffer.writeUint16BE(this.ID, offset);
        offset += 2;
        const flags =
            (this.QR << 15) |
            (this.OPCODE << 11) |
            (this.AA << 10) |
            (this.TC << 9) |
            (this.RD << 8) |
            (this.RA << 7) |
            this.Z |
            this.RCODE;
        buffer.writeUint16BE(flags, offset);
        offset += 2;
        buffer.writeUint16BE(this.QDCOUNT, offset);
        offset += 2;
        buffer.writeUint16BE(this.ANCOUNT, offset);
        offset += 2;
        buffer.writeUint16BE(this.NSCOUNT, offset);
        offset += 2;
        buffer.writeUint16BE(this.ARCOUNT, offset);
        return new Uint8Array(buffer);
    }
}

export class  Question {
    name: String;
    type: number;
    class: number;

    constructor(question : QuestionInterface) {
        this.name = question.name;
        this.type = question.type;
        this.class =  question.class;
    }

    encode ():  Uint8Array {
        const typeAndClass = Buffer.alloc(4);
        typeAndClass.writeUint16BE(this.type, 0);
        typeAndClass.writeUint16BE(this.class, 2);

        const s = this.name.split('.').map((e) => `${String.fromCharCode(e.length)}${e}`).join('') + `\x00`;
        const nameBuffer = Buffer.from(s, 'binary');

        const finalBuffer = Buffer.concat([new Uint8Array(nameBuffer), new Uint8Array(typeAndClass)]);
        return new  Uint8Array(finalBuffer);
    }
}