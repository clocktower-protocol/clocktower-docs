Clocktower WP Outline 

An EVM compliant protocol for reoccurring timely payments

Many financial and commercial uses such as mortgage, rent, and bond payments, estate planning, subscriptions for goods and services and many others. 

The missing piece in decentralized finance. 

The Three Problems

1) Incentivized Polling

	A) Limitations of smart contracts
		---watch analogy
		---Smart contracts cannot run timely actions without being polled by an EOA 			account.

	B)  Polling mechanics
		-- allowance
		-- percentage of total
		-- incentivized remit

	C) Avoiding stalling
		-- paid in kind (erc20)
		-- token minimum
		-- lower the gas the better for all parties

2) Time Conversion

	A) Time
		--- Gregorian vs Unix Time
	B) Time Series 
		--- Don’t work with incremented time because they are not a defined point but a 			neverending series of points. 
	C) Conversion in the contract through the use of Julian Day calcs. Show calcs.

3) Fees and Refunds

	A) Proration. Show calcs

		--- first payment holdback

	B) The three users. Examples of exploits
		-- fee balances
		-- contract as source of dynamic refund policy

	C) Conditional Refunds. Show table
	



Lifecycle

--- note about use of subscription terms but can be applicable to any sort of regular payment. Use of Provider, Subscriber, Caller. But in a different context could be Payer, Receiver.

1) Creating a subscription

	--- Provider makes function call. Parameters
	--- Describe function to destroy subscription. 
	--- Graph
2) Signing up to pay

	--- Approval transaction
	--- Calling the subscribe function. Parameters.
	--- Unsubscribe. Parameters
	--- Graph

3) Polling the contract

	--- Remit function. No parameters
	--- Only called once a day
	--- Fees immediately sent from contract fee balance
	--- Graph

4) Fails

	--- Allowance and balance
	
Goals








