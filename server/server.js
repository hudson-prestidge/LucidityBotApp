var PORT = process.env.PORT || 3002
var app = require('./app')

app.listen(PORT, () => console.log('http server listening on port: ', PORT))
