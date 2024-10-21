export interface HeaderInterface {
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

export interface  QuestionInterface {
    name: String,
    type: number,   // 2 bytes
    class: number   // 2 bytes
}

export interface  AnswerInterface {
    name: string;
    type: number;   // 2 bytes
    class: number;  // 2 bytes
    ttl: number;    // 4 bytes
    data: string
}

export interface DNS_Packet {
    Header: HeaderInterface,
    Question: QuestionInterface
}