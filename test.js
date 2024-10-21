const name = "google.com";
const s = name.split('.').map((e) => `${String.fromCharCode(e.length)}${e}`).join('');

console.log(s);