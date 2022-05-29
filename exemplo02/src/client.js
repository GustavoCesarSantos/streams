import { createWriteStream } from 'node:fs'
import { get } from 'node:http'
import { Transform, Writable } from 'node:stream'


const url = 'http://localhost:3000'
const getHttpResponse = () => new Promise(resolve => get(url, response => resolve(response)))
const readableStream = await getHttpResponse()

readableStream
    .pipe(
        Transform({
            objectMode: true,
            transform(chunk, enc, cb) {
                const item = JSON.parse(chunk)
                const myNumber = /\d+/.exec(item.name)[0]
                const isEven = myNumber % 2 === 0
                item.name = item.name.concat(isEven ? ' is even': ' is odd')
                cb(null, JSON.stringify(item))
            }
        })
    )
    .filter(chunk => chunk.includes('even'))
    .map(chunk => chunk.toUpperCase())
    //Criar arquivo no sistema
    // .pipe(
    //     createWriteStream('response.log', { flags: 'a'})
    // )
    //Retornar arquivo como resposta no console por exemplo
    // .pipe(
    //     Writable({
    //         objectMode: true,
    //         write(chunk, enc, cb) {
    //             console.log('chunk: ', chunk)
    //             return cb()
    //         }
    //     })
    // )
    .pipe(process.stdout)