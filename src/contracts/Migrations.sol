// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Migrations {
    address public owner;
    uint public last_complated_migration;

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint completed) public restricted {
        last_complated_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_complated_migration);
    }
}