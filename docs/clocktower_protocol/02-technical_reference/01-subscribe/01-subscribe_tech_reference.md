---
id: subscribe_tech_reference
title: ClockTowerV1Subscribe
---

# ClockTowerV1Subscribe

### Allowed Time Ranges

- Weekly Subscriptions -- 1 - 7 (Weekdays)
- Monthly Subscriptions -- 1 - 28 (Day of Month)
- Quarterly Subscriptions -- 1 - 90 (Day of Quarter)
- Yearly Subscription -- 1 - 365 (Day of Year  (not including leap days))

### Future Transaction Range
- Future Transactions -- Unixtime / 3600 (Unix Hours)

## Data Structures
The following are the data structs required by external functions:

### Subscription Data

#### Structs

##### Subscription

```
 struct Subscription {
    bytes32 id;
    uint amount;
    address provider;
    address token;
    bool exists;
    bool cancelled;
    Frequency frequency;
    uint16 dueDay;
    string description;
}
```
| Name | Type | Description|
|---|---|---|
| `id` | bytes32 | Unique hash generated for each subscription |
| `amount` | uint | Amount of subscription in wei |
| `provider` | address | Address of the creator of the subscription |
| `token` | address | ERC20 address of token used in subscription |
| `exists` | bool | True if subscription exists |
| `cancelled` | bool | True if subscription is cancelled |
| `frequency` | Frequency | [Frequency](./subscribe_tech_reference#frequency) |
| `dueDay` | uint16 | Day in frequency [range](./subscribe_tech_reference#allowed-time-ranges) when subscription is paid |
| `description` | string | Description of subscription |


##### SubView
```
 struct SubView {
    Subscription subscription;
    Status status;
    uint totalSubscribers;
 }
```
| Name | Type | Description|
|---|---|---|
| `subscription` | Subscription | [Subscription](./subscribe_tech_reference#subscription) |
| `status` | Status | [Status](./subscribe_tech_reference#status) |
| `totalsubscribers` | uint | Total number of subscribers |

##### FeeEstimate
```
struct FeeEstimate {
    uint fee;
    address token;
}
```
| Name | Type | Description|
|---|---|---|
| `fee` | uint | Fee amount in wei |
| `token` | address | ERC20 address of token |

##### SubscriberView
```
struct SubscriberView {
    address subscriber;
    uint feeBalance;
}
```
| Name | Type | Description|
|---|---|---|
| `subscriber` | address | Subscriber address |
| `feeBalance` | uint | Fee balance of subscriber in wei |

#### Enums
(Enum values are represented by numbers starting at zero)

##### Frequency
```
enum Frequency {
    WEEKLY,
    MONTHLY,
    QUARTERLY,
    YEARLY
}
```
| Value | Description|
|---|---|
| `0` | WEEKLY |
| `1` | MONTHLY |
| `2` | QUARTERLY |
| `3` | YEARLY |

##### Status
```
enum Status {
    ACTIVE,
    CANCELLED,
    UNSUBSCRIBED
}
```
| Value | Description|
|---|---|
| `0` | ACTIVE |
| `1` | CANCELLED |
| `2` | UNSUBSCRIBED |

##### SubEvent
```
enum SubEvent {
    PAID,
    FAILED,
    SUBSCRIBED, 
    UNSUBSCRIBED,
    FEEFILL
}
```
| Value | Description|
|---|---|
| `0` | PAID |
| `1` | FAILED |
| `2` | SUBSCRIBED |
| `3` | UNSUBSCRIBED |
| `4` | FEEFILL |

##### ProvEvent
```
enum ProvEvent {
    CREATE,
    CANCEL,
    PAID,
    FAILED
}
```
| Value | Description|
|---|---|
| `0` | CREATE |
| `1` | CANCEL |
| `2` | PAID |
| `3` | FAILED |


## Global Variables
### Subscription Global Variables

| Name | Type | Description| Format |
|---|---|---|---|
| `callerFee` | uint | Percentage paid to caller on remits | 10000 = No fee, 10100 = 1%, 10001 = 0.01% |
| `systemFee` | uint | Flat fee paid to admin account when systemFee bool is true | wei |
| `maxGasPrice` | uint | Maximum gas value for remit function | gwei |
| `maxRemits` | uint | Maximum number of remits per remit function (usually based on block max) | |
| `admin` | address | Address for admin account |
| `lastCheckedDay` | uint40 | Last time remit ws called | Unix epoch time |

## Events
### Subscription Events
##### SubscriberLog
```
event SubscriberLog(
    bytes32 indexed id,
    address indexed subscriber,
    uint40 timestamp,
    uint amount,
    SubEvent indexed subEvent
)
```

Log emitted during subscriber events

| Name | Type | Indexed | Description |
|---|---|:---:|---|
| `id` | bytes32 | :heavy_check_mark: | Unique Subscription id |
| `subscriber` | address | :heavy_check_mark: | Address of subscriber |
| `timestamp` | uint40 | | Unix Epoch timestamp |
| `amount` | uint | | ERC20 subscription amount in wei |
| `subEvent` | SubEvent | :heavy_check_mark: | [SubEvent](./subscribe_tech_reference#subevent)

##### CallerLog
```
event CallerLog(
    uint40 timestamp,
    uint40 checkedDay,
    address indexed caller,
    bool isFinished
)
```

Log emitted during Caller events

| Name | Type | Indexed | Description |
|---|---|:---:|---|
| `timestamp` | uint40 | | Unix epoch timestamp |
| `checkedDay` | uint40 | | Day in frequency range checked by Caller |
| `caller` | address | :heavy_check_mark: | Address of caller |
| `isFinished` | bool | | Shows if Caller is done |

##### ProviderLog
```
event ProviderLog(
    bytes32 indexed id,
    address indexed provider,
    uint40 timestamp,
    bool success,
    uint8 errorCode,
    ProvEvent indexed provEvent
)
```

Log emitted during Provider events

| Name | Type | Indexed | Description |
|---|---|:---:|---|
| `id` | bytes32 | :heavy_check_mark: | Unique subscription id |
| `provider` | address | :heavy_check_mark: | Provider address |
| `timestamp` | uint40 | | Unix epoch timestamp |
| `success` | bool | | Shows if event was successful |
| `errorCode` | uint8 | | Errorcode if there was a problem |
| `provEvent` | ProvEvent | :heavy_check_mark: | [ProvEvent](./subscribe_tech_reference#provevent) |


## Functions
### Subscription Functions
#### Input Functions
##### createSubscription
```
function createSubscription(
    uint amount,
    address token, 
    string description, 
    Frequency frequency, 
    uint16 dueDay
) external payable
```
Allows provider to create a new subscription. 

Parameters:

| Name | Type | Description |
|---|---|---|
| `amount` | uint | Amount of subscription in wei |
| `token` | address | ERC20 address of token used in subscription |
| `description` | string | Description of subscription |
| `frequency` | Frequency | [Frequency](https://github.com/vhmarx/clocktower#frequency) |
| `dueDay` | uint16 | Day in [range](./subscribe_tech_reference#allowed-time-ranges) based on frequency when subscription is paid |

##### subscribe
```
function subscribe(
    Subscription subscription
) external payable
```
Allows user to subscribe to subscription

Parameters: 

| Name | Type | Description |
|---|---|---|
| `subscription` | Subscription | [Subscription](./subscribe_tech_reference#subscription) |


##### unsubscribe
```
function unsubscribe(
    bytes32 id
) external payable
```
Allows user to unsubscribe from subscription. 

msg.sender must be subscribed to subscription. 

Parameters:

| Name | Type | Description |
|---|---|---|
| `id` | bytes32 | Unique subscription id |

##### unsubscribeByProvider
```
function unsubscribeByProvider(
    address subscriber, 
    bytes32 id
) external
```
Allows provider to cancel subscriber from their created subscriptions. 

msg.sender must be creator of subscription and subscriber must be subscribed. 

Parameters: 

| Name | Type | Description |
|---|---|---|
| `subscriber` | address | Subscriber address |
| `id` | bytes32 | Unique subscription id |


##### cancelSubscription
```
function cancelSubscription(
    Subscription subscription
) external
```
Allows provider to cancel subscription. All existing subscribers will no longer be charged

msg.sender must be creator of subscription

Parameters: 

| Name | Type | Description |
|---|---|---|
| `subscription` | Subscription | [Subscription](./subscribe_tech_reference#subscription) |


#### View Functions
##### getSubscribers
```
function getSubscribers(
    bytes32 id
) external view returns (address[] memory)
```

Returns an array of all subscriber addresses per subscription

Parameters: 

| Name | Type | Description |
|---|---|---|
| `id` | bytes32 | Unique subscription id |

Return Values:

| Name | Type | Description |
|---|---|---|
| `address[]` | address | Array of subscriber addresses |


##### getAccountSubscriptions
```
function getAccountSubscriptions(
    bool bySubscriber
    ) returns (SubView[])
```
Returns an array of objects containing subscription and status

If bySubscriber is true it gets a list of subscriptions msg.sender is subscribed to. 
If false it gets a list of subscriptions msg.sender created as the provider. 

Parameters: 

| Name | Type | Description |
|---|---|---|
| `bySubscriber` | bool | See above description of bool |

Return Values:

| Name | Type | Description |
|---|---|---|
| `SubView[]` | SubView | Array of [Subview](./subscribe_tech_reference#subview) structs |

##### getSubscribersById
```
function getSubscribersById(
    bytes32 id
    ) external view returns (SubscriberView[] memory)
```

Returns array of objects containing subscriber info. 

Parameters: 

| Name | Type | Description |
|---|---|---|
| `id` | bytes32 | Unique subscription id |

Return Values:

| Name | Type | Description |
|---|---|---|
| `SubscriberView[]` | SubscriberView | Array of [SubscriberView](./subscribe_tech_reference#subscriberview) structs |

##### getSubByIndex
```
function getSubByIndex(
    bytes32 id, 
    Frequency frequency, 
    uint16 dueDay
    ) view public returns(Subscription subscription)
```

Returns subscription object

Parameters: 

| Name | Type | Description |
|---|---|---|
| `id` | bytes32 | Unique subscription id |
| `frequency` | Frequency | [Frequency](./subscribe_tech_reference#frequency) |
| `dueDay` | uint16 | Day in [range](./subscribe_tech_reference#allowed-time-ranges) based on frequency when subscription is paid |

Return Values:

| Name | Type | Description |
|---|---|---|
| `subscription` | Subscription | [Subscription](./subscribe_tech_reference#subscription) |


##### feeEstimate
```
function feeEstimate(

) returns(FeeEstimate[]) 
```
Returns an array of objects showing the next batch of remits and possible fees

Return Values:

| Name | Type | Description |
|---|---|---|
| `FeeEstimate[]` | FeeEstimate | Array of [FeeEstimate](./subscribe_tech_reference#feeestimate) structs |

