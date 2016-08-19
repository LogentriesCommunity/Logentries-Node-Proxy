## Node Proxy to The Logentries Service
It is possible to safely and securely log from web browser clients to the Logentries service without exposing your log's token ids.  This repository shows one way to accomplish that task by using a Node server as a proxy between the client and Logentries.

##### Prerequisites
+ Node 0.10+
+ Logentries Log token

##### Setup
1. Clone the repository locally
1. Enter the directory
1. Run ``` npm install ```
1. Replace the fake token in token.json with your own.
1. Run ```node server.js```
1. Open your browser to <http://localhost:3000>
1. Practice sending a log entry from the client via the UI to your logentries account.
