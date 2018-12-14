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
    event WithdrawSuccess(address Bidder, uint amount);
    
    modifier OnlyOwner{
        require(msg.sender == Owner, "Yor are not Owner of this Auction");
        _;
    }
    
    modifier IsRunning{
        require (now <= EndingTime, "Auction has ended");
        _ ;
    }
    
    function Bid(uint amount) public IsRunning payable{
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
    
    function Withdraw() public payable returns(bool){
        if(BidderAcc[msg.sender] > 0){
            uint AmountSend = BidderAcc[msg.sender];
            BidderAcc[msg.sender] = 0;
            if(!msg.sender.send(BidderAcc[msg.sender])) {
                BidderAcc[msg.sender] = AmountSend;
                return false;
            }
            else{
                emit WithdrawSuccess(msg.sender,AmountSend);
                return true;
            }
        }
        
    }
    
    function EndBid() public OnlyOwner{
        Islive = false;
    }
    
}