import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { Readable } from 'node:stream'

function * run() {
    for(let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `Gustavo-${index}`,
            at: Date.now()
        }
        yield data
    }
}

function handler(request, response) {
    // const readableStream = Readable({
    //     read() {
    //         this.push('Hello')
    //         this.push('World')
    //         this.push(null)
    //     }
    // })

    const readableStream = Readable({
        read() {
            for(const data of run()) {
                this.push(JSON.stringify(data).concat('\n'))
            }
            this.push(null)
        }
    })
    readableStream.pipe(response)
}

http.createServer(handler)
.listen(3000)
.on('listening', () => console.log('Server on in port: 3000'))