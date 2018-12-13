pragma solidity ^0.4.25;


contract Auction{
    
    uint EndingTime;
    address Owner;
    uint HighestBid;
    address HighestBidder;
    bool Islive = false;
    mapping (address => uint) BidderAcc;
    
    constructor(uint InitialVal, uint endtime) public{
        Owner = msg.sender;
        EndingTime = endtime;
        HighestBid = InitialVal;
        if(endtime > now){
            Islive = true;
        }
    }
    
    event NewHighestBid(address Bidder, uint amount);
    event AuctionEnded(address HighestBidder, uint HighestBid);
    
    modifier OnlyOwner{
        require(msg.sender == Owner);
        _;
    }
    
    function Bid(uint amount) payable public{
        if(amount > HighestBid && Islive == true){
            BidderAcc[msg.sender] = amount;
            HighestBid = amount;
            HighestBidder = msg.sender;
            emit NewHighestBid(HighestBidder, HighestBid);
        }
        else{
            emit AuctionEnded(HighestBidder,HighestBid);
        }
    }
    
    function Withdraw() payable public{
        if(BidderAcc[msg.sender] > 0){
            BidderAcc[msg.sender] = 0;
            msg.sender.transfer(BidderAcc[msg.sender]);
        }
        
    }
    
}