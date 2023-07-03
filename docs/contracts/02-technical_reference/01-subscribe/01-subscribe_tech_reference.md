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
| `frequency` | Frequency | [Frequency](#frequency) |
| `dueDay` | uint16 | Day in frequency [range](#allowed-time-ranges) when subscription is paid |
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
| `subscription` | Subscription | [Subscription](#subscription) |
| `status` | Status | [Status](#status) |
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

##### Time
```
struct Time {
    uint16 day;
    uint16 weekDay;
    uint16 quarterDay;
    uint16 yearDay;
}
```
| Name | Type | Description|
|---|---|---|
| `day` | uint16 | Day of month |
| `weekDay` | uint16 | Day of week |
| `quarterDay` | uint16 | Day of quarter |
| `yearDay` | uint16 | Day of year |


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
    FEEFILL, 
    REFUND
}
```
| Value | Description|
|---|---|
| `0` | PAID |
| `1` | FAILED |
| `2` | SUBSCRIBED |
| `3` | UNSUBSCRIBED |
| `4` | FEEFILL |
| `5` | REFUND |

##### ProvEvent
```
enum ProvEvent {
    CREATE,
    CANCEL,
    PAID,
    FAILED,
    REFUND
}
```
| Value | Description|
|---|---|
| `0` | CREATE |
| `1` | CANCEL |
| `2` | PAID |
| `3` | FAILED |
| `4` | REFUND |


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
| `subEvent` | SubEvent | :heavy_check_mark: | [SubEvent](#subevent)

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
| `provEvent` | ProvEvent | :heavy_check_mark: | [ProvEvent](#provevent) |


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
| `frequency` | Frequency | [Frequency](#frequency) |
| `dueDay` | uint16 | Day in [range](#allowed-time-ranges) based on frequency when subscription is paid |

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
| `subscription` | Subscription | [Subscription](#subscription) |


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
| `subscription` | Subscription | [Subscription](#subscription) |


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
| `SubView[]` | SubView | Array of [Subview](#subview) structs |

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
| `SubscriberView[]` | SubscriberView | Array of [SubscriberView](#subscriberview) structs |

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
| `frequency` | Frequency | [Frequency](#frequency) |
| `dueDay` | uint16 | Day in [range](#allowed-time-ranges) based on frequency when subscription is paid |

Return Values:

| Name | Type | Description |
|---|---|---|
| `subscription` | Subscription | [Subscription](#subscription) |


##### feeEstimate
```
function feeEstimate(

) returns(FeeEstimate[]) 
```
Returns an array of objects showing the next batch of remits and possible fees

Return Values:

| Name | Type | Description |
|---|---|---|
| `FeeEstimate[]` | FeeEstimate | Array of [FeeEstimate](#feeestimate) structs |

#### Time Functions

##### unixToTime
```
function unixToTime(
    uint unix
) returns(Time time)
```
Converts a unix time value to [Time](#time) struct

Parameter:

| Name | Type | Description |
|---|---|---|
| `unix` | uint | Unix time value |

Return Value:

| Name | Type | Description |
|---|---|---|
| `time` | Time | [Time](#time) struct |

Code:

```
uint _days = unix/86400;
uint16 day;
uint16 yearDay;
       
int __days = int(_days);

int L = __days + 68569 + 2440588;
int N = 4 * L / 146097;
L = L - (146097 * N + 3) / 4;
int _year = 4000 * (L + 1) / 1461001;
L = L - 1461 * _year / 4 + 31;
int _month = 80 * L / 2447;
int _day = L - 2447 * _month / 80;
L = _month / 11;
_month = _month + 2 - 12 * L;
_year = 100 * (N - 49) + _year + L;

uint uintyear = uint(_year);
uint month = uint(_month);
uint uintday = uint(_day);

day = uint16(uintday);        

uint dayCounter;

//loops through months to get current day of year
for(uint monthCounter = 1; monthCounter <= month; monthCounter++) {
    if(monthCounter == month) {
        dayCounter += day;
    } else {
        dayCounter += getDaysInMonth(uintyear, month);
    }
}

    yearDay = uint16(dayCounter);

    //gets day of quarter
    time.quarterDay = getdayOfQuarter(yearDay, uintyear);
    time.weekDay = getDayOfWeek(unix);
    time.day = day;
    time.yearDay = yearDay;
```

##### isLeapYear
```
function isLeapYear(
    uint year
) returns (bool leapYear)
```

Checks if year is a leap year

Parameter:

| Name | Type | Description |
|---|---|---|
| `year` | uint | Number of year in Gregorian Calendar |

Return Value:

| Name | Type | Description |
|---|---|---|
| `leapYear` | bool | True if leap year |

Code:

```
leapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
```

##### getDaysInMonth
```
function getDaysInMonth(
    uint year, 
    uint month
) returns (uint daysInMonth)
```
Returns the number of days in the month based on Gregorian year and month calendar values

Parameters:

| Name | Type | Description |
|---|---|---|
| `year` | uint | Number of year in Gregorian Calendar |
| `month`| uint | Number of month in Gregorian Calendar |

Return Value:

| Name | Type | Description |
|---|---|---|
| `daysInMonth` | uint | Number of days in the month |

Code: 

```
if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    daysInMonth = 31;
} else if (month != 2) {
    daysInMonth = 30;
} else {
    daysInMonth = isLeapYear(year) ? 29 : 28;
}
```

##### getDaysOfWeek
```
function getDaysofWeek(
    uint unixTime
) returns (uint16 dayOfWeek)
```

Returns the number of the day of the week

Parameter:

| Name | Type | Description |
|---|---|---|
| `unixTime` | uint | Unix time value |

Return Value:

| Name | Type | Description |
|---|---|---|
| `dayOfWeek` | uint16 | Day of the week (1 = Monday, 7 = Sunday) |

Code:

```
uint _days = unixTime / 86400;
uint dayOfWeekuint = (_days + 3) % 7 + 1;
dayOfWeek = uint16(dayOfWeekuint);
```

##### getdayOfQuarter
```
function getdayOfQuarter(
    uint yearDays, 
    uint year
) returns (uint16 quarterDay)
```

Returns the day of the quarter range day based the year and the day of the year

Parameters:

| Name | Type | Description |
|---|---|---|
| `yearDays` | uint | Day of the year (Between 1 - 365) |
| `year`| uint | Number of year in Gregorian Calendar |

Return Value:

| Name | Type | Description |
|---|---|---|
| `quarterDay` | uint16 | Day of the quarter (1 - 90) |

Code:
```
uint leapDay;
if(isLeapYear(year)) {
    leapDay = 1;
} else {
    leapDay = 0;
}

if(yearDays <= (90 + leapDay)) {
    quarterDay = uint16(yearDays);
} else if((90 + leapDay) < yearDays && yearDays <= (181 + leapDay)) {
    quarterDay = uint16(yearDays - (90 + leapDay));
} else if((181 + leapDay) < yearDays && yearDays <= (273 + leapDay)) {
    quarterDay = uint16(yearDays - (181 + leapDay));
} else {
    quarterDay = uint16(yearDays - (273 + leapDay));
}
```

##### unixToDays
```
function unixToDays (
    uint40 unixTime
) returns (uint40 dayCount)
```

Returns the amount of days (rounded down) since unix epoch based on a provided unix time

Parameter:

| Name | Type | Description |
|---|---|---|
| `unixTime` | uint | Unix time value |

Return Value:

| Name | Type | Description |
|---|---|---|
| `dayCount` | uint16 | Number of days (rounded down) since unix epoch |

Code:

```
dayCount = unixTime/86400;
```