# DNS Server in TypeScript

A fully functional DNS server built using TypeScript. This project showcases a custom implementation of a DNS server, capable of processing DNS queries and responding with the appropriate records. It is designed for educational purposes and demonstrates how DNS protocols work under the hood.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [DNS Query Flow](#dns-query-flow)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Features

- Supports A (Address) record queries
- Parses and responds to DNS queries via UDP
- Extracts information from the DNS "Question" section
- Lightweight and easy to set up
- Written entirely in TypeScript

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Bun](https://bun.sh/)

### Clone the repository

```bash
git clone https://github.com/PratapRathi/DNS-Server-ts.git
cd DNS-Server-ts

```

### Install dependencies
```bash
npm install
```

### Build the project
```bash
npm run build
```

## Usage
Start the DNS server by running:
```bash
sudo npm run start
```
By default, the server listens on localhost and the standard DNS PORT 53.

You can test your server using nslookup or dig:

```bash
nslookup www.example.com localhost
```
or
```bash
dig @localhost www.example.com
```
## Project Structure
```bash
📦 DNS-Server-ts
├─ app
│  ├─ app.ts    // Entry point of application
│  └─ dnsMessage.ts
├─ types
│  └─ index.ts
├─ utils
│  └─ helperFuntions.ts
├─ .gitattributes
├─ .gitignore
├─ bun.lockb
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json
```
## Project Workflow
![image](https://github.com/user-attachments/assets/4a1fcc8e-a881-48f1-b99e-0c1cabec4c94)

## DNS Query Flow

1. **Receive a query:** The server listens for incoming DNS requests.
2. **Parse the packet:** The query is parsed to extract the header and question sections.
3. **Process the query:** The server processes the DNS question and prepares a response.
4. **Send a response:** A DNS response is constructed and sent back to the client.

## Future Improvements

- Add support for additional DNS record types (e.g., MX, CNAME)
- Implement caching for faster responses
- Support for TCP in addition to UDP

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or feature requests.
