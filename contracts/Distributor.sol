//SPDX-License-Identifier: MIT
pragma solidity 0.8;

contract Distributor {
    struct DistributorInfo {
        address distributorAddress;
        bool access;
    }

    mapping(address => string[]) private distributorsByAddress;
    mapping(address => mapping(string => bool)) private registeredDistributors;
    mapping(address => string) private distributorNames;

    modifier onlyDistributor() {
        require(isDistributor(msg.sender), "Only registered distributors can perform this action");
        _;
    }

    function addDistributor(address _user, string memory _name) external {
        distributorsByAddress[_user].push(_name);
    }

    function getDistributors(address _user) external view returns (string[] memory) {
        return distributorsByAddress[_user];
    }

    function registerDistributorName(string memory _name) external {
        registeredDistributors[msg.sender][_name] = true;
    }

    function isDistributorNameRegistered(address _manufacturer, string memory _name) public view returns (bool) {
        return registeredDistributors[_manufacturer][_name];
    }

    function setDistributorName(string memory _name) external {
        distributorNames[msg.sender] = _name;
    }

    function getDistributorName(address _manufacturer) public view returns (string memory) {
        return distributorNames[_manufacturer];
    }

    function isDistributor(address _account) public view returns (bool) {
        for (uint256 i = 0; i < distributorsByAddress[_account].length; i++) {
            if (registeredDistributors[_account][distributorsByAddress[_account][i]]) {
                return true;
            }
        }
        return false;
    }
}
