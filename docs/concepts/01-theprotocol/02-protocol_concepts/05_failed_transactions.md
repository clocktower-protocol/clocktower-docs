---
id: failed_transactions
title: Failed Transactions
sidebar_position: 5
---

# Failed Transactions

### Reasons for failure

In an open ended setup like subscriptions where transactions are scheduled indefinitley there will occur situations where a subscriber fails. This can occur for two reasons:

- Not enough approval
- Not enough funds

Therefore when the caller function makes its periodic check for scheduled transactions it also checks whether the subscriber has enough approval and funds. 

In order to avoid attacks on the contract the protocol must create expenses born by the subscriber that make failure costly enough that even a malicious user would want to avoid failing. 

Lets see how this works based on different situations. 

### Problems

#### Revocation

If the subscriber has revoked their approval for Clocktower to move funds from their account the transaction will fail. 

When a subscription fails because of lack of approval two things must be done

- The subscriber must be unsubscribed by the caller.
- A majority of the [fee balance](./05_fee_balance.md) must be refunded to the Provider with a smaller amount going to the caller. 

But why is this necessary?

#### Unsubscribing

- Even though the contract no longer has approval to remit funds the subscriber is still subscribed to the subscription. So if approval continues to remain revoked the subscription will fail every cycle creating never-ending cost to the caller with no compensation. 

- since its cheaper gas-wise for the subscriber to revoke approval than to cancel the subscription subscribers will choose revoking approval as a method of unsubscribing. 

While there are normal reasons for accidentally revoking approval the above two conditions require that the user must be unsubscribed from the subscription automatically by the caller upon failure. If the subscriber revoked approval in error then they will now need to resubscribe costing additional gas.

#### Attack vectors

There are situations where a malicious subscriber would intentionally fail. 

#### DOS and Griefing attacks

A subscriber could intentionally fail to create unremeimbursed gas costs for the caller. This money losing situation could create too many losses for the caller making it uneconomical and therefore stopping the contract from incrementing through time. 

But by giving enough of the forfeited fee balance to compensate for gas costs on failure these losses are mitigated. But why not give ALL the forfeited balance to the caller?

#### Freeloader attack

Another attack involves a malicious subscriber being both subscriber and caller while intentionally failing.  If the caller was refunded all of the forfeited [fee balance](./05_fee_balance.md) then they could get a free cycle of goods or services from the creator of the subscription since they would be paying themselves back as caller. In order to mitigate this, a majority of the fee balance must be refunded to the provider in order to pay for goods or services rendered within the time period and a smaller portion refunded to the caller to pay for gas costs. 

Since the subscriber would now constantly lose funds it mitigates the above attack. 

#### Other vectors

If another vector arises then we have also given the creator of the subscription the ability to remove users from their list of subscribers with their own distinct method. 

Above we have mentioned using a fee balance to pay the caller and mitigate attacks. But how does this actually work? We go over this in the next section. 




