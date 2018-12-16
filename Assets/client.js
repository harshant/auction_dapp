// client side code to interact with smartcontract

var AuctionContractABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "Bid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
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
	}
];

// Initializing web 3 instnace
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);  // web3.ethereum is also available for modern browsers
   } else {
	// set the provider you want from Web3.providers
	alert('Non-Ethereum browser detected. You should consider trying MetaMask! Now trying for Ganache(testRPC)');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
   }

web3.eth.defaultAccount = web3.eth.accounts[0]; //using the first account as default

var CObj = web3.eth.contract(AuctionContractABI);
ContractInstance = CObj.at('0xd90cf6a5388eee5278ef74e225e0c95061a598bd');


//Application code
var TransactionHash;
$('#app').hide();
$('#makeBid').click(function(){
    ContractInstance.Bid({from:web3.eth.defaultAccount,value:parseInt($('#bidAmount').val())},function (error, result) {
		$('#app').show();
		$('#dissapp').hide();
		if (!error){
			console.log(result);
			TransactionHash = result;
		}
        else
            console.error(error);
    });
     
});

ContractInstance.NewHighestBid().watch(function(err,result){
	if(!err){
		$('#tbody').append('<tr><td>'+result.args.Bidder+'</td><td>'+TransactionHash+'</td><td>'+result.args.amount+' WEI</td></tr>');
		$('#raised').html(result.args.amount);
		$('#app').hide();
		$('#dissapp').show();
	}
	else{
			console.log("error in placing bid");
	}
});


// Client code after loding
window.onload = function () {  

	$('#defacc').html( web3.eth.defaultAccount.substring(0,20)+"...");
	if( web3.eth.defaultAccount !== '0xa448f08d6ddba559cf421e25843ab673f93a7769'){
		$('#endAuction').hide();
	}

	ContractInstance.HighestBid(function (err,res) {
		$('#raised').html(res.c[0]);	
	});
	
	ContractInstance.EndingTime(function (err,res) {
		countDownDate = res.c[0]*1000;	
	});

	ContractInstance.HighestBidder(function (err,res) {
		$('#highestBidder').html(res.substring(0,12)+"...");	
	});

	web3.eth.getBalance(web3.eth.defaultAccount,function(err,res){
		  $('#accountBalance').html(res.c[0]/10000);
	});
}