# AugurChallenge

Augur Technical Challenge 

## Challenges

### A. When a device hits a web page, assign a unique ID ​to that device’s browser
##### Completed Task - A Unique ID is assigned to a device's browser

### B. When that browser is restarted and the device hits that page again, the browser has the same ID
##### Completed Task - Since the Cache is being used, even on restart the same ID would be displayed

### C. After the browser clears it’s cookies, the browser has the same ID
##### Completed Task - Since the Cache is being used and cookies are not used, even on restart the same ID would be displayed

### D. After the browser clears cache, cookies, and all, the browser has the same ID
##### Completed Task - Using the IP address to map the Unique ID to the IP address (Since Routers exists, It is more like doing at Household level rather than a particular user)

### E. More than one browser (Chrome, Firefox, Opera, IE, Safari, etc.) on the device share the same ID
### F. Repeat tests A-to-E on another device and have it pass all tests
### G. Running your software at web scale, no two devices share an ID