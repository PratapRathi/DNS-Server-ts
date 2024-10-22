import dns from 'dns';

const name = "www.google.com";

dns.lookup(name, (err, address, family) => {
    console.log('address of %s is %j family: IPv%s',
        name, address, family);
    console.log(name);
    console.log(address);
    console.log("IPv" + family);
});

// async function call() {
//     const address = await dns.lookup(name);
//     console.log(address);
// }

// call();