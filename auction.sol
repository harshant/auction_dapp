pragma solidity ^0.4.25;


contract Auction{
    
    //using public variables so that any user can query them at any time
    uint public EndingTime;
    address public Owner;
    uint public HighestBid;
    address public HighestBidder;
    bool public Islive = false;
    mapping (address => uint) public BidderAcc;
    
    constructor(uint InitialVal, uint endtime) public{
        Owner = msg.sender;
        EndingTime = endtime;
        HighestBid = InitialVal;
        if(endtime > now){          // The truth that a miner can manipulate now(block.timestamp) is not much of a concern here
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
        _;
    }
    // DAO type of attacks are not possible because of separate withdraw function
    function Bid() public IsRunning payable{
        if(msg.value > HighestBid && Islive == true){
            BidderAcc[msg.sender] = msg.value;
            HighestBid = msg.value;
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
            if(!msg.sender.send(BidderAcc[msg.sender])) {    //send does not allow expensive fallback function due to limited gas available
                BidderAcc[msg.sender] = AmountSend;          //error handling is important for transaction
                return false;
            }
            else{
                emit WithdrawSuccess(msg.sender,AmountSend);
                return true;
            }
        }
        
    }
    
    function EndBid() public OnlyOwner{    //Only the owner of the contract can stop the live auction
        Islive = false;
    }
    
}