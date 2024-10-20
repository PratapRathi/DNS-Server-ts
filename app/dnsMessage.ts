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

    constructor(header : Header) {
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

export interface Header {
    ID: number,
    QR: number,
    OPCODE: number,
    AA: number,
    TC: number,
    RD: number,
    RA: number,
    Z: number,
    RCODE: number,
    QDCOUNT: number,
    ANCOUNT: number,
    NSCOUNT: number,
    ARCOUNT: number
}