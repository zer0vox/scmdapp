// SPDX-License-Identifier: MIT
pragma solidity 0.8;

contract Retailer {
    struct RetailerInfo {
        address retailererAddress;
        bool access;
    }

    mapping(address => string[]) private retailersByAddress;
    mapping(address => mapping(string => bool)) private registeredRetailers;
    mapping(address => string) private retailerNames;

    modifier onlyRetailer() {
        require(isRetailer(msg.sender), "Only registered manufacturers can perform this action");
        _;
    }

    function addRetailer(address _user, string memory _name) external {
        retailersByAddress[_user].push(_name);
    }

    function getRetailers(address _user) external view returns (string[] memory) {
        return retailersByAddress[_user];
    }

    function registerRetailerName(string memory _name) external {
        registeredRetailers[msg.sender][_name] = true;
    }

    function isRetailerNameRegistered(address _manufacturer, string memory _name) public view returns (bool) {
        return registeredRetailers[_manufacturer][_name];
    }

    function setRetailerName(string memory _name) external {
        retailerNames[msg.sender] = _name;
    }

    function getRetailerName(address _manufacturer) public view returns (string memory) {
        return retailerNames[_manufacturer];
    }

    function isRetailer(address _account) public view returns (bool) {
        for (uint256 i = 0; i < retailersByAddress[_account].length; i++) {
            if (registeredRetailers[_account][retailersByAddress[_account][i]]) {
                return true;
            }
        }
        return false;
    }
}
