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
    type: number,
    class: number
}

export interface DNS_Packet {
    Header: HeaderInterface,
    Question: QuestionInterface
}