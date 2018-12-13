pragma solidity ^0.4.25;


contract Auction{
    
    uint EndingTime;
    
    address Owner;
    
    uint HighestBid;
    
    uint HighestBidder;
    
    mapping (address => uint) BidderAcc;
    
    constructor(uint InitialVal, uint endtime) public{
        Owner = msg.sender;
        EndingTime = endtime;
        HighestBid = InitialVal;
    }
    
    modifier OnlyOwner{
        require(msg.sender == Owner);
        _;
    }
    
    function Bid(uint amount) payable public{
        if(amount > HighestBid){
            BidderAcc[msg.sender] = amount;
            HighestBid = amount;
            HighestBidder = msg.sender;
        }
        else{
            
        }
        
    }
    
    
}