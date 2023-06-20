---
id: summary
title: Summary
sidebar_position: 1
---

## Summary

(While Clocktower Protocol can support many different contracts supporting different types of timed transactions. For Versions 1.0 we will focus on subscriptions only)

Version 1 of the Clocktower Protocol is a decentralized blockchain based subscription service targeting [three sets of users](/docs/concepts/01-theprotocol/02-protocol_concepts/03_three_users.md): Providers, Subscribers and Callers. 

### Providers

Providers can create subscriptions either directly to the subscribe contract or through our frontend or through their own custom frontend.  

After choosing details of the subscription such as the freqency, amount and due date they will then pay the blockchain fees and be given a unique URL to dissemenate to their subscribers. 

### Subscribers

After receiving the unique URL subscribers can then subscribe either directly through the contract, through our frontend or through the providers frontend. 

Upon subsription they will be charged for the first cycle of the subscription. A portion of this amount will be stored in the contract as a [fee balance](/docs/concepts/01-theprotocol/02-protocol_concepts/06_fees.md). The rest is sent to the provider. 

On the due day the subscriber will be charged the subscription amount If they don't have enough tokens or have revoked approval the transaction will [fail](/docs/concepts/01-theprotocol/02-protocol_concepts/05_failed_transactions.md) and they will automatically be unsubscibed forfeiting the fee balance. 

They can unsubscribe at anytime by calling the appropriate function. 

### Callers

Initially the Caller will be restricted to the protocol operators. 

Eventually any user will be able to call the contract. The first to do so each day will pay for remittance of tokens but will also be [rewarded with fees](/docs/concepts/01-theprotocol/02-protocol_concepts/06_fees.md). 



