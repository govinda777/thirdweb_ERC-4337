Feature: Smart Wallet Integration
  As a user
  I want to interact with my smart wallet
  So that I can manage my digital assets securely

  Scenario: Connect to Smart Wallet
    Given I am on the home page
    When I click the "Connect Wallet" button
    Then I should see the wallet connection modal
    And I should be able to select my preferred wallet provider

  Scenario: View Wallet Balance
    Given I am connected to my smart wallet
    When I navigate to the dashboard
    Then I should see my current balance
    And I should see my recent transactions

  Scenario: Send Transaction
    Given I am connected to my smart wallet
    And I have sufficient balance
    When I enter a valid recipient address
    And I specify the amount to send
    And I confirm the transaction
    Then the transaction should be processed successfully
    And I should see a confirmation message 