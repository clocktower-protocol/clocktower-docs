---
id: fees
title: Incentives
sidebar_position: 3
---

## The importance of paying the Caller

As shown in the previous section the Caller must be incentivized to poll the contract at regular intervals. So how is this done?

## Why ETH fees don't work

One might think that paying the Caller in ETH would be the most appropriate since the Caller must pay for the gas of polling the contract. But there are a few reasons this won't work. 

### Ethereum and Approval

As explained [here](./04_approval.md), the ability for the protocol to have approved access to user accounts is critical to seamlessly transfer tokens at a future date. 

While all standard ERC-20 tokens have a built-in process to facilitate approval ETH does not. We could possibly require a user to keep wrapped ETH in their account but this is not ideal from a UX perspective nor is it common for the average user to hold wrapped ethereum in their wallet. 

### No Oracles

Another problem is that if we required one of the parties to pay their fees in ETH but the future transfer is in an ERC-20 token we would need some sort of oracle to calculate the price of the ERC-20 vs ETH to have a proportional fee. But since having [no oracles](./01_goals.md) is a goal of the protocol this conversion is not ideal. 

## In kind fees

