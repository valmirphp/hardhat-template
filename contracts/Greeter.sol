// SPDX-License-Identifier: UNLICENSED

// Obs: para fins de estudo foram adicionados as extensões Ownable e Pausable,
// porém uma boa prática é utilizar o contrato prontos do OpenZeppelin, exemplo:
// import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity >=0.8.4;

import { console } from "hardhat/console.sol";
import { Ownable } from "./extensions/Ownable.sol";
import { Pausable } from "./extensions/Pausable.sol";

error GreeterError();

contract Greeter is Ownable, Pausable {
    string public greeting;

    event Greeted(address indexed sender, string greeting, bool isMaster);

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public whenNotPaused {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
        emit Greeted(msg.sender, _greeting, false);
    }

    function setGreetingMaster(string memory _greeting) public whenNotPaused onlyOwner {
        string memory newGreeting = string(abi.encodePacked("*", _greeting, "*"));
        console.log("Changing greeting from '%s' to '%s'", greeting, newGreeting);
        greeting = newGreeting;
        emit Greeted(msg.sender, newGreeting, true);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function throwError() external pure {
        revert GreeterError();
    }
}
