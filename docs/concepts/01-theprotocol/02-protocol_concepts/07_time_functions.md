---
id: time_functions
title: Time Functions
sidebar_position: 7
---

## Time

The computational and human understanding of time is critical for the Clocktower Protocol. In order for the contract to schedule transactions in the future it must know what time it is. We accomplish this by incentivizing the caller to poll the contract on a regular basis. 

But in order to actually schedule the transactions we must translate different human beings understanding of time into something the contract can recognize and save. 

But first a digression into the basics of time. 

### Two Time Systems

Our systmes of time are ways for humans to capture regular natural occurances. Years represent how long it takes for the earth to move around the sun, days how long it takes the earth to spin around fully. Seconds roughly translate to the rythym of a heartbeat and months to the cycle of the moon. 

While humans (and computers) prefer to think of abstractions in discrete terms. Nature usually is not so cut and dry. For example, years don't perfectly line up with 365 days and the rotation of the earth slows down slightly over time. These variances have led to the evolution of two distinct time systems. 

#### Unix Time

One of the easiest ways to measure time is to pick an arbitrary point in the past and increment a number at a regular interval. In computers one finds this most often in [Unix Time](https://en.wikipedia.org/wiki/Unix_time) which is a system where a number increments every second past midnight January 1st 1970. 

##### Leap Days and Leap Seconds

The problem is that nature doesn't increment so cleanly. In order to deal with the more analog and variable aspects of the slowing rotation of the earth and the fractional days of the year, time must be added or subtracted to the incrementation in order not to become disconnected from nature. 

Thus, leap days and leap seconds are added to keep things in sync. 

#### Gregorian Time

In order to deal with the days of the year problem most of the world uses the [Gregorian Calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) credited to [Pope Gregory XIII](https://en.wikipedia.org/wiki/Pope_Gregory_XIII) and based on an [earlier version](https://en.wikipedia.org/wiki/Julian_calendar) designed by [Julius Caesar](https://en.wikipedia.org/wiki/Julius_Caesar). The key aspect of the Gregorian calendar is the addition of leap days on February 29th so sync up the calendar with the solar rotation of the earth. 

## Time Ranges

Subscriptions are an open ended time series. You can't easily save an open ended series with an incrementing number. For instance theres no sane way to save the date "every 5th day of the month" using just unix time. You could theoretically save a long series of calculated dates in seconds after midnight Jan. 1st 1970. But this is inefficient and what happens if the subscription goes longer than the initial series of numbers. Now you have to recalculate somehow and add more. A MUCH simpler solution is to use a Gregorian calendar point. 

So for each type of frequency of subscription we simply create a range of numbers:

| Frequency | Range |
|---|---|
| Weekly | 1 - 7 |
| Monthly | 1 - 28 |
| Quarterly | 1 - 90 |
| Yearly | 1 - 365 |

But now we've run into a problem. How do we translate this range number back and forth to unix time?

### Julian Days

The best way to translate the block timestamp incremeting unix number to Gregorian [ranges](#time-ranges) is to use an intermediary incrementing day standard called [Julian Days](https://en.wikipedia.org/wiki/Julian_day). 

Using the following code the contract can do this translation [without Oracles or any other external sources](/docs/concepts/01-theprotocol/02-protocol_concepts/01_goals.md)

More details about these translation functions can be found in the [technical documention](/docs/contracts/02-technical_reference/01-subscribe/01-subscribe_tech_reference.md)

### Leap Problems

#### Leap Days

But what happens to our incrementation in the presence of a leap day or leap second? The leap increments in certain situations can cause problems. For instance if you allow the user to set a monthly subscription to pay on the 29th of the month it will only actually work every four years. 

This is why in the above [ranges](#time-ranges) we simply don't allow the 29th day of the month or higher to be used in monthly subscriptions or higher than 365 days in the yearly range. 

#### Leap Seconds

Leap seconds are less of a concern for the protocol for several reasons. 

1. The timestamp on a block is calculated currently with a [fifteen second variance](https://consensys.github.io/smart-contract-best-practices/development-recommendations/solidity-specific/timestamp-dependence/) between what the actual time is and the time a validator can put to a block. This fifteen seconds causes more drift than a potential leap second would cause. 
2. The smallest time unit used in subscriptions is a day. So even if a timestamp is incorrect it would only matter if it occurred at midnight. By allowing a potential drift of a day or two from the set day range this should be mitigated. 
3. By not allowing the 29th day of the month or higher or the 366 day of the year we mitigate the timestamp drifting the time over into a nonallowable day range. 

### 15 second block timestamp drift
- changing day cutoff away from midnight

### Leap seconds
- changing cutoff away from midnight

