Notes from Hugo, Feb 15 2024

- Should start with the major problems and what we are proposing to solve it

OUTLINE:

I. **3 major technical problems**

1) Humans do time in Gregorian (months, days, hours) while computers do time incrementally (Unix Epoch Time). So you have to convert. But you need an algorithm to do this without using an external oracle. 
2) The chain is "time unaware" in that it can only check the time when externally told to
3) Providers, Subscribers and Callers can all be the same person which leads to attack vectors (Solution: contract becomes the arbitor of refund dynamics
    Consider copy/paste from docusaurus, per Hugo

II. Thematics / goals of the protocol

III. Protocol Lifecycle

   creation - done by provider
   initiation - subscriber subscribes, funds the subscription, can unsubscribe and cancel
   perpetuating - caller perpetuates the subscription, resets the 

   All of these players are contributing to the overall lifecycle of a SUBSCRIPTION



For V1 whitepaper, maybe we don't worry about the gas dynamics



Feb 29th - leap year date



==========================================================================

The Clocktower protocol solves these issues by creating a specialized smart contract that is polled regularly by economically incentivized actors. This allows users to schedule transactions at a future time of their choosing. By incorporating such features as subscriptions, future payments, batch transactions, reversible transactions and ERC20 compatibility, Clocktower unlocks the potential of fintech and defi projects seeking recurrent payments while staying true to the principle of decentralization. 

==========================================================================








#####################################################

Snippets


The Clocktower project seeks to solve this problem by acting as a public service unlocking the potential of the future from the limitations of a system stuck in the perpetual present. 


# pandoc snippet.md  --from=markdown --to=pdf --filter=pandoc-citeproc --bibliography=whitepaper.bib  --output=whitepaper.pdf

# pandoc snippet.md  --from=markdown+multiline_tables --to=pdf --filter=pandoc-citeproc --bibliography=whitepaper.bib  --output=whitepaper.pdf


The Ethereum blockchain is a decentralized clock creating a block every twelve seconds. For each node, seconds matter, as they go through the task of creating blocks and gossiping them to the network. Its therefore ironic that even with this elaborate timing mechanism smart contracts are unable to know what time it is unless asked, like a person with an expensive watch who can't look down at it unless told to do so.

#################

The arrangement of price and the good/service to be exchanged is determined off-chain through any standard path--typically this would involve a website but could also be arranged at an in-person meeting, etc. After agreeing on the exchange details, subscription information is written to a smart contract, including an interval (daily, weekly, monthly, quarterly, annually) and an amount to be collected from the subscriber. Once established, subscriber and provider roles are complete until one of the parties wishes to make a change the in the exchange agreement. 

It is at this point the subscription lifecycle, we introduce the third player in the system--the Caller. The job of the Caller is very simple: run a function (called 'Remit')that checks to see if any of the subscriber payments are due to their respective providers, and if so, moves the appropriate value (remittance) to the appropriate provider. When a caller makes a call to the contract, he is charged a fee by the network, and so the Caller is incentivized with compensatory fees designed to offset this cost and provide profit. This incentive to call the contract is at the heart of Clocktower. At the most basic level, the Caller is making a decision based on the following scenarios:

A. total gas cost <  total fees --> call contract
B. total gas cost >= total fees --> do not call contract
 
In times of low gas prices (scenario A), running the remit function will be profitable and thus will be called; human callers (or as the ecosystem matures, bots) will call remit() and funds will move appropriately. In times of high gas costs (scenario B), the total cost of gas will exceed the gas and potential callers will wait until those prices decrease to call remit(). 


################