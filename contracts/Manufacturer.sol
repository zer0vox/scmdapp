//SPDX-License-Identifier: MIT
pragma solidity 0.8;

contract Manufacturer {
    struct ManufacturerInfo {
        address manufacturerAddress;
        bool access;
    }

    mapping(address => string[]) private manufacturersByAddress;
    mapping(address => mapping(string => bool)) private registeredManufacturers;
    mapping(address => string) private manufacturerNames;

    modifier onlyManufacturer() {
        require(isManufacturer(msg.sender), "Only registered manufacturers can perform this action");
        _;
    }

    function addManufacturer(address _user, string memory _name) external {
        manufacturersByAddress[_user].push(_name);
    }

    function getManufacturers(address _user) external view returns (string[] memory) {
        return manufacturersByAddress[_user];
    }

    function registerManufacturerName(string memory _name) external {
      
    
        registeredManufacturers[msg.sender][_name] = true;
    }

    function isManufacturerNameRegistered(address _manufacturer, string memory _name) public view returns (bool) {
        return registeredManufacturers[_manufacturer][_name];
    }

    function setManufacturerName(string memory _name) external {
        manufacturerNames[msg.sender] = _name;
    }

    function getManufacturerName(address _manufacturer) public view returns (string memory) {
        return manufacturerNames[_manufacturer];
    }

    function isManufacturer(address _account) public view returns (bool) {
        for (uint256 i = 0; i < manufacturersByAddress[_account].length; i++) {
            if (registeredManufacturers[_account][manufacturersByAddress[_account][i]]) {
                return true;
            }
        }
        return false;
    }
   
    }

