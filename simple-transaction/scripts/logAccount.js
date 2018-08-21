var StellarSdk = require('stellar-sdk')
const pairs = require('../pairs.json')

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
var accountB = pairs[1].publicKey

var payments = server.payments().forAccount(accountB)

payments.stream({
  onmessage: function(payment) {
    const asset = (payment.asset_type === 'native') ? 'lumens' : `${payment.asset_code}:${payment.asset_issuer}`
    console.log(`${payment.amount} ${asset} from ${payment.from}`)
  }
})
