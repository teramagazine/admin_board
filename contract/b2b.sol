
contract B2B {

 
    mapping(address => string) notices;
    address public buyer;
    address public seller;
    address public tpl;//3pl Third-party logistics
    uint256 public createdTimestamp;
    uint256 public approvalTimestamp;
    uint256 public paymentTimestamp;
    uint256 public lockTimestamp;
    uint256 public seller_unlockTimestamp;
    uint256 public Buyer_unlockTimestamp;


    uint256 public amount_to_pay=0;
    mapping(address => address) process;
    mapping(address => bool) unlock;

    function constant_read()constant returns (string){
        return notices[msg.sender];
    }
    
    function initiate_business(address counterparty, uint256 amount ){//we suppose the buyer will deploy the contract
        createdTimestamp=block.timestamp;
        buyer=msg.sender;
        seller=counterparty;
        //amount_to_pay=amount;
        notices[counterparty]="en attente d'acceptation";
        notices[msg.sender]="en attente d'acceptation";
    }
    
    function get_notice()constant returns(string){
        return  notices[msg.sender];
    }
    uint256 indice=0;//not approve more than once
    function approve(){
        require(msg.sender==seller&&indice==0);
            notices[msg.sender]="operation in progress";
            notices[buyer]="operation in progress";
            approvalTimestamp=block.timestamp;
            indice++;
        
    }
    
    function reject(){
        
            notices[seller]="rejected";
        
    }


    function get_locked_funds()constant returns(uint256){
        return this.balance;
    }

    event ev_fund( uint256 amount);
    
    function lock_funds() payable{
        amount_to_pay+=msg.value;
        ev_fund(msg.value);
        lockTimestamp=block.timestamp;
        
    }

    function unlock_funds(){
        
           unlock[msg.sender]=true;
           if (msg.sender==seller)
           seller_unlockTimestamp=block.timestamp;
           if(msg.sender==buyer)
           Buyer_unlockTimestamp=block.timestamp;
    }

function getlock(address add)constant returns (bool){
    return unlock[add];
}

    function pay_duty(){
        require(unlock[buyer]&&unlock[seller]&&this.balance>0);
        seller.transfer(this.balance);
        notices[seller]="payment unlocked";
        notices[buyer]="payment unlocked";
        amount_to_pay=0;
        paymentTimestamp=block.timestamp;
        indice=0;
    }


}
 