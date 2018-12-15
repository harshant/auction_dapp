// client side code to interact with smartcontract

var web3 = new Web3("ws://localhost:8545"); //using injected provider by metamask if available

Web3.givenProvider.enable();
//web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
//.once('transactionHash', function(hash){ ... })
//.once('receipt', function(receipt){ ... })
//.on('confirmation', function(confNumber, receipt){ ... })
//.on('error', function(error){ ... })
//.then(function(receipt){
    // will be fired once the receipt is mined
//});

web3.eth.defaultAccount = web3.eth.accounts[0]; //using the first account as default
var AuctionContractABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "EndBid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "HighestBid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "BidderAcc",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Withdraw",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "EndingTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Bid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "HighestBidder",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Islive",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "InitialVal",
				"type": "uint256"
			},
			{
				"name": "endtime",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "NewHighestBid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "HighestBidder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "HighestBid",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawSuccess",
		"type": "event"
	}
];

var ContractObj = new web3.eth.Contract(AuctionContractABI,'0xab365be129078e87667fd4a8f84e3f6f9bdd3e6d');

$('#makeBid').click(function(){
     ContractObj.methods.Bid(parseInt($('#bidAmount').val()));
});

ContractObj.events.NewHighestBid(function(err,result){
    if(!err){
    $('#tbody').innerHTML += '<tr><td>'+result[0]+'</td><td>'+result[1]+'</td></tr>';
    }
    else{
        console.log("error in placing bid");
    }
});
