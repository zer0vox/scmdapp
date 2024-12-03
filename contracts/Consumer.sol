//SPDX-License-Identifier: MIT
pragma solidity 0.8;

contract Consumer {
    struct ConsumerInfo {
        string name;
        string livingAddress;
        uint256 postalCode;
        bool access;
    }

    mapping(address => ConsumerInfo) private consumers;
    address[] private consumerAddresses;

    modifier onlyConsumer() {
        require(consumers[msg.sender].access, "You're not a registered consumer");
        _;
    }

    function addConsumer(address _consumerAddress, string memory _name, string memory _livingAddress, uint256 _postalCode) external {
        require(!consumers[_consumerAddress].access, "Consumer already registered");
        consumers[_consumerAddress] = ConsumerInfo({
            name: _name,
            livingAddress: _livingAddress,
            postalCode: _postalCode,
            access: true
        });
        consumerAddresses.push(_consumerAddress);
    }

    function removeConsumer(address _consumerAddress) external {
        require(consumers[_consumerAddress].access, "Consumer not registered");
        delete consumers[_consumerAddress];
        for (uint256 i = 0; i < consumerAddresses.length; i++) {
            if (consumerAddresses[i] == _consumerAddress) {
                consumerAddresses[i] = consumerAddresses[consumerAddresses.length - 1];
                consumerAddresses.pop();
                break;
            }
        }
    }

    function getConsumer(address _consumerAddress) external view returns (string memory, string memory, uint256) {
        require(consumers[_consumerAddress].access, "Consumer not registered");
        return (consumers[_consumerAddress].name, consumers[_consumerAddress].livingAddress, consumers[_consumerAddress].postalCode);
    }

    function getAllConsumers() external view returns (address[] memory) {
        return consumerAddresses;
    }

   
}

