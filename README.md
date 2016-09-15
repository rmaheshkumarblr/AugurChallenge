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
##### Completed Task - Using the IP address to map the Unique ID to the IP address and vice-vera (Since Routers exists, It is more like doing at Household level rather than a particular user)

### E. More than one browser (Chrome, Firefox, Opera, IE, Safari, etc.) on the device share the same ID
##### Completed Task - Since I am using the IP address to map the Unique ID to the IP address and vice-vera. For any ip it gives the same ID. 
#### ( Need to consider mapping multiple ips to same user id since he/she may have a phone with different ip )

### F. Repeat tests A-to-E on another device and have it pass all tests
##### Ran the server on 0.0.0.0 and tried running different browsers from my laptop as well as my phone (different private IP). It seems to pass all the tests.

### G. Running your software at web scale, no two devices share an ID
### This is very tough since we can't get too much information about the device information from the request. If we were able to get vendorID / MAC Address it would be useful. In my case since I am testing from my laptop which has a different local ip from that of the phone, it worked but in real world it becomes really tough because the request object does not have too many parameter that can be used to uniquely identify the hardware.