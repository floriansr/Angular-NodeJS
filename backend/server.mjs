import { createServer } from 'http'

const server = createServer((req, res) => {
   res.end("voila la réponse du premier serveur")
})

server.listen(process.env.PORT || 3000)