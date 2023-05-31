---
id: fees
title: Incentives
sidebar_position: 3
---

## Paying the Caller

As shown in the previous section the Caller must be incentivized to poll the contract at regular intervals. So how is this done?

### Why ETH fees don't work

One might think that paying the Caller in ETH would be the most appropriate since the Caller must pay for the gas of polling the contract. But there are a few reasons this won't work. 

#### Ethereum and Approval

As explained [here](./04_approval.md), the ability for the protocol to have approved access to user accounts is critical to seamlessly transfer tokens at a future date. 

While all standard ERC-20 tokens have a built-in process to facilitate approval ETH does not. We could possibly require a user to keep wrapped ETH in their account but this is not ideal from a UX perspective nor is it common for the average user to hold wrapped ethereum in their wallet. 

#### No Oracles

Another problem is that if we required one of the parties to pay their fees in ETH but the future transfer was an ERC-20 token we would need some sort of oracle to calculate the price of the ERC-20 vs ETH to have a proportional fee. But since having [no oracles](./01_goals.md) is a goal of the protocol this conversion is not ideal. 

### Subscription considerations

A further issue presents itself when using subscriptions. Since subscriptions are an open ended obligation of the subsciber with no end date unless cancelled, there must be a method of extracting fees from either the subscriber or the provider on an ongoing basis. But how is this done? 

#### In kind fees

As shown above paying the Caller in ETH is not ideal. So the solution is to simply pay the fee in the same ERC-20 token as the subscription. In order to avoid oracles it will need to be a percentage of the overall transaction. But who pays this fee? The subscriber or the receiver?

#### Problem with the receiver paying. 

One might initially think that the receiver should pay a portion of their earnings each period to the Caller. This seems simpler since there is only one receiver and they are the one's receiving all the funds. 

But there is an attack vector if we go this route. Since we have no way of knowing the ownership of an ethereum address it is possible that combinations of the sender, receiver and caller can be the same entity.

If the subscriber/sender and caller are the same while the receiver pays the fee to the caller there is a situation where the subscriber could sign up for a subscription and but not fund their account. When the transaction fails the fee would still be extracted from the receiver and paid to the caller (who is also the subscriber.) If the fee is higher than the gas costs of signing up for the subscription then the malicious subscriber now has a method of extracting tokens from the receiver. 

#### Problems with the sender paying

If the receiver can't be the one paying the caller it must the sender/subscriber. But this choice presents additional issues that must be considered. 

The biggest issues revolve around the problem of failed transactions which we will go into in the next sections, [failed transactions](./04_failed_transactions). 

The solutions is having a [fee balance](05_fee_balance.md) where fees can be reserved and paid depending on the situation. 





- gas costs of per round fee
- need for fee balance to avoid griefing



- Percentage of ERC20 used
- Must be paid by the sender
- Must have a fee balance
- Low gas costs benefit the protocol






