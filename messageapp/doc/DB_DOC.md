# DB

All the messages are being stored in an external database.

## DB message model

- ``destination: String``
- ``message: String``
- ``number: Number``

## Testing the db-service connection

| If the messageapp responses with...      | then the message... |
| ------------- | ------------- | 
| ...a 200 status code|  ...is stored with CONFIRMED status (sent and confirmed) |  
| ...a 500 status code |  ...is stored with PENDANT status (not sent, not confirmed)  | 
| ...a 504 status code (server timeout)  |  ...is stored with SENT statuss (sent but not confirmed)   | 