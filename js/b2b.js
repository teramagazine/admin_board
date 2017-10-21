    var project_instance=0x0;
 	 	var user=0x0;
/*window.addEventListener('load', function() {*/

   if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
	console.log("1");
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
	 //    window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/esamuIL4MaKepy64zcLj"));

		console.log("2");

  }
 
 
  var contractAbi =[{"constant":false,"inputs":[],"name":"pay_duty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"createdTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amount_to_pay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"counterparty","type":"address"},{"name":"amount","type":"uint256"}],"name":"initiate_business","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"approvalTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Buyer_unlockTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"lock_funds","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"seller_unlockTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reject","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paymentTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_locked_funds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"add","type":"address"}],"name":"getlock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lockTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unlock_funds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_notice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"constant_read","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tpl","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"ev_fund","type":"event"}];
 
 
 

console.log("account :"+web3.eth.accounts[0]);
var contract_address="0x0";

 

ProjectContract =  web3.eth.contract(contractAbi);
//var project_contract = ProjectContract.at(contract_address); //change contract_address to your contract address
var project_contract = ProjectContract.at("0x6cd8717a9e5e4d5f91e0e4ce370b5ecb99da3b97"); 

function initiate_b(address,amount){

 
var transactionObject = {from: web3.eth.accounts[0], gas: 3000000 };

				project_contract.initiate_business(address,amount,transactionObject, function(err, result){
					if(!err)
						document.getElementById("results").innerHTML = 'Transaction en cours:  <a href="https://ropsten.etherscan.io/tx/' + result+'">'+result+'</a>';
					else
						document.getElementById("results").innerHTML = ' error: ' + err;
				});
}
 
function get_noticed(){

 project_contract.get_notice(function(error, result){
    if(!error)
    console.error("result"+result);
	else
    console.error("errore"+error);
});

 
}
 
function list_operations(){
var situation;
 
var timestamp;
var amount;

 project_contract.get_notice(function(error, result){
    if(!error)
    return result;
	else
    return error;
});
/***********detect the counterparty on each side *******/

 project_contract.seller(function(error, result){
    if(!error)
	{   if( web3.eth.accounts[0]==result)

				  project_contract.buyer(function(error, result){
					if(!error)
					{
				 
					document.getElementById("address_").innerHTML=result;
					}
					else
					console.log(error);
				});

	}
	else
    console.log(error);
}); 

 
  project_contract.buyer(function(error, result){
    if(!error)
	{   if( web3.eth.accounts[0]==result)

				  project_contract.seller(function(error, result){
					if(!error)
					{
				 
					document.getElementById("address_").innerHTML=result;
					}
					else
					console.log(error);
				});

	}
	else
    console.log(error);
}); 
   
   
project_contract.amount_to_pay(function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=web3.fromWei(result, 'Szabo');
	else
    amount=error;
});

  } 

  function deposit( amount){
  //if approval lockfunds 
 // web3.toWei(1000000,'finney')})
 /*amount=web3.toWei(amount, 'shannon');  console.log(amount); 
 console.log(web3.toWei(amount, 'finney'));
 console.log(web3.toWei(amount, 'Szabo'));
 console.log(web3.fromWei(amount, 'finney'));
 console.log(web3.fromWei(amount, 'Szabo'));
 console.log(web3.fromWei(amount, 'shannon'));*/
 
	//amount=amount/1000000;
	var transactionObject = {from: web3.eth.accounts[0], value: web3.toWei(amount, 'Szabo'),  gas: 3000000 };

	  project_contract.lock_funds(transactionObject,function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=result;
	else
    amount=error;
}); 
  }  

  function unlock_funds_(){
        
project_contract.unlock_funds(function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=result;
	else
    amount=error;
});

}
  /**************** seller actions****************************/
  function approve(){
  	var transactionObject = {from: web3.eth.accounts[0],  gas: 3000000 };

  project_contract.approve(transactionObject,function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=result;
	else
    amount=error;
});
  }
  
  function reject(){
    	var transactionObject = {from: web3.eth.accounts[0],   gas: 3000000 };

  project_contract.reject(transactionObject,function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=result;
	else
    amount=error;
});
  }
  
function get_locked_funds_(){

 
  project_contract.get_locked_funds(function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=web3.fromWei(result, 'Szabo'); 
	else
    amount=error;
});
}


  function pay_duty_(){
        
project_contract.pay_duty(function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=result;
	else
    amount=error;
});

}
 
  function get_funds_status(){
var buyer;
   project_contract.buyer(function(error, result){
    if(!error)
   buyer=result;
	else
   buyer=error;
}); 
 
  project_contract.getlock(buyer,function(error, result){
    if(!error)
    document.getElementById("amount_res").innerHTML=web3.fromWei(result, 'Szabo'); 
	else
    amount=error;
});
}















 





 