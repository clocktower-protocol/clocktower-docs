---
id: fees
title: Fees
sidebar_position: 5
---

## Caller Fees

## System Fees

The protocol has the ability to require system fees to be paid by the receiver and the caller in order to fund the eventual ongoing development of the protocol. 

This fee is taken as additional ethereum applied to the caller function and the creation of subscriptions. 

Currently the fee is turned off but the protocol reserves the right to turn it on at some point in the future. 

## Refund Table

| Initiator | Action | Amount | Refunds Sent to |
|---|---|---|---|
| Subscriber | Fail due to Approval | Partial caller / Partial Receiver | Caller / Receiver |
| Subscriber | Fail due to low funds | Partial caller / Partial Receiver | Caller / Receiver |
| Subscriber | Unsubscribes | All remaining | Subscriber | 
| Receiver | Receiver unsubscribers subscriber | All remaining | Subscriber |
| Receiver | Cancels overall subscription | All remaining on all subscribers | Contract? or Caller? |


