// client side code to interact with smartcontract

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546"); //using injected provider by metamask if available

//web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
//.once('transactionHash', function(hash){ ... })
//.once('receipt', function(receipt){ ... })
//.on('confirmation', function(confNumber, receipt){ ... })
//.on('error', function(error){ ... })
//.then(function(receipt){
    // will be fired once the receipt is mined
//});

web3.eth.defaultAccount = web3.eth.accounts[0]; //using the first account as default