



## Fee Market and Incentive Structure

symbols:

# subscription triggered by call      lower case sigma        σ
# value of a subscription triggered   lower case sigma sub v  σᵥ
fee %                               lower case phi          φ or F
gas per subscription                lower case gamma        γ or G

total sum of the value of all subscriptions per remit call * fee percentage = Per subscription gas cost *  # of subscriptions per call
# φ * Σσᵥⁿ   =  γ * Σσⁿ

or 

# F * Σσᵥⁿ   =  G * Σσⁿ





## Fee Balance Calculation

The ability to incentivise a Caller to pay the gas on future transactions is critical to the clocktower protocol. As such, a fee structure accompanies subscriptions and relies on certain assumptions.

cost remit:   35000 gwei
gas price:    20
eth price:    1500

# F * Σσᵥⁿ   =  G* n * σⁿ
0.02 * 20           =  35000 Gwei * 20 * n (total remitted subs)
n = 100 subs
fee = 2%
avg remit = $120

Example
Find equilibrium in Eth for fee total vs gas total

fee x # of subs * avg sub transaction value($) * ETH/$  = [Per subscription gas cost *  gas price * # of subscriptions remitted] * 1Eth/ 1x10^9 Gwei

[# of subs cancels on both sides]

fee    x     avg sub tx value ($)  x     ETH/$          =  Per sub gas cost  * gas price * 1 Eth / 1x10^9 Gwei

0.02 * 100 *120 * 1/$1700         =  35000 Gwei * 20 * 100
$240 * 1 Eth / $1700 = 7.0 x 10 ^7 Gwei / 10
141,176,471 > 70,000,000
profit = ~0.07 Eth



major variables are the gas price and the avg sub tx value (or the sum value in dollars of all subscription payments to be remitted by this call)

The fee will be kept as low as possible while still incentivizing a population of Callers to call the remit function on the clocktower contract. 
