---
id: time_functions
title: Time Functions
sidebar_position: 7
---

## Time

The computational and human understanding of time is critical for the Clocktower Protocol. In order for the contract to schedule transactions in the future it must know what time it is. We accomplish this by incentivizing the caller to poll the contract on a regular basis. 

But in order to actually schedule the transactions we must translate different human beings understanding of time into something the contract can recognize and save. 

### Two Time Systems

Our systmes of time are ways for humans to capture regular natural occurances. Years represent how long it takes for the earth to move around the sun, days how long it takes the earth to spin around fully. Seconds roughly translate to the rythym of a heartbeat and months to the cycle of the moon. 

While humans (and computers) prefer to think of abstractions in discrete terms. Nature usually is not so cut and dry. For example, years don't perfectly line up with 365 days and the rotation of the earth slows down slightly over time. These variances have led to the evolution of two distinct time systems. 

#### Incrementing Systems

One of the easiest ways to measure time is to pick an arbitrary point in the past and increment a number at a regular interval. In computers one finds this in [Unix Time](https://en.wikipedia.org/wiki/Unix_time) which is a system where a number increments every second past midnight January 1st 1970. 

The ancient Romans used a similar system where there were a fixed amount of days 