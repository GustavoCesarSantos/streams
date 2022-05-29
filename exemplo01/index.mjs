// 1 - Terminal Inputs
// const stdin = process.stdin
//     .on('data', msg => console.log('Terminal input was', msg))
// const stdout = process.stdout
//     .on('data', msg => process.stdout.write(msg.toString().toUpperCase()))
// stdin.pipe(stdout)

//2
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
import http from 'node:http'
import { readFileSync, createReadStream } from 'fs'

http.createServer((request, response) => {
    // const file = readFileSync('big.file').toString()
    // response.write(file).end()
    createReadStream('big.file')
    .pipe(response)
})
.listen(3000)
.on('listening', () => console.log('Server on in port: 3000'))