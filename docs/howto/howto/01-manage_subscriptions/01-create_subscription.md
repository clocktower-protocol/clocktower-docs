---
id: create_subscription
title: Create a Subscription
---

# Create a Subscription

The following section will describe how to create a subscription. 

### Required Parameters

All subscriptions require the following information to be entered:

| Parameter | Description |
|---|---|
| Token | ERC20 token you wish to paid in. From pre-defined list |
| Amount | Amount of tokens you wish to be paid per period |
| Frequency | Frequency of payment. Currently either weekly, daily, quarterly or yearly |
| DueDay | Payday in [range](../../../contracts/02-technical_reference/01-subscribe/01-subscribe_tech_reference.md#allowed-time-ranges) determined by frequency | 

### Optional Parameters

| Parameter | Description | |
|---|---|---|
| Description | Brief title of Subscription | RECOMMENDED |
| URL | URL link to more info on subscription | |