// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stackingBalance;
    mapping(address => bool) public hasStacked;
    mapping(address => bool) public isStacking;

    constructor(RWD _rwd, Tether _tether ) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // deposit tokens
    function depositToken(uint _amount) public {
        //require stacking amount to be grater than zero
        require(_amount > 0, "amount cannot to be zero");
        tether.transferFrom(msg.sender, address(this), _amount);
        // update staking balance
        stackingBalance[msg.sender] += _amount;

        if(!hasStacked[msg.sender]){
            stakers.push(msg.sender);
        }

        // update stacking balance
        isStacking[msg.sender] = true;
        hasStacked[msg.sender] = true;
    }

    // unstacke tokens
    function unstackeTokens() public {
        uint balance = stackingBalance[msg.sender];
        require(balance > 0, "stacking balance cannot be less than zero");

        // transfer the tokens to specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // reset stacking balance
        stackingBalance[msg.sender] = 0;

        // update stacking status
        isStacking[msg.sender] = false;
    }

    // issue rewards
    function issueTokens() public {
        //require the owner to issue tokens only
        require(msg.sender == owner, "caller must be owner");
        for (uint i = 0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stackingBalance[recipient] / 9; // /9 to create percentage
            if(balance > 0){
                rwd.transfer(recipient, balance);
            } 
        }
    }

}