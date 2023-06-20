---
id: fees
title: Fees
sidebar_position: 6
---

## Caller Fees

As described in [failed transactions](./04_failed_transactions) the best way to pay fees to the caller is by having a reserve of ERC-20 tokens per subscriber per subscription. This reserve serves the dual purpose of both paying the caller fees for the periodic remitance of transactions and disincentivizing actions contrary to the protocol. 

### What is the amount of the caller fee?

Currently the caller fee is different based upon the average gas levels of the chain the contract is on. The fee can be adjusted by the protocol. The fees are as follows:

| Chain | Fee Percentage |
|---|---|
| Ethereum | 2% |


### The Reserve

#### When is it filled?

The reserve for subscribers is filled at two points in time:

1. When a user first subscribes 
2. When a user's reserve becomes less than the caller fee

#### Is it the same amount for each subscription?

The reserve is filled at different amounts based upon the frequency of the subscription:

| Frequency | Amount reserved | 
|---|---|
| Weekly | Full Amount |
| Monthly | Full Amount |
| Quarterly | 1/3 Amount |
| Yearly | 1/12 Amount |

#### How are refunds processed?

Depending on the reason for the refund the is sent to different locations based on the following table:

| Initiator | Action | Amount | Refunds Sent to |
|---|---|---|---|
| Subscriber | Fail due to Approval | Partial caller / Partial Receiver | Caller / Receiver |
| Subscriber | Fail due to low funds | Partial caller / Partial Receiver | Caller / Receiver |
| Subscriber | Unsubscribes | All remaining | Subscriber | 
| Receiver | Receiver unsubscribers subscriber | All remaining | Subscriber |
| Receiver | Cancels overall subscription | All remaining on all subscribers | Contract? or Caller? |

## System Fees

The protocol has the ability to require system fees to be paid by the receiver and the caller in order to fund the eventual ongoing development of the protocol. 

This fee is taken as additional ethereum applied to the caller function and the creation of subscriptions. 

Currently the fee is turned off but the protocol reserves the right to turn it on at some point in the future. 




