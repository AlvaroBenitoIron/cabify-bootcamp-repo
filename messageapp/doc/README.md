# API Contract

This document contains the requests our API accepts, and the possible success and error responses it can return.

## API Reference

#### Get all items

```http
  POST /messages
```




## Responses
#### Success
- Required keys well provided: 200: OK

#### Error
- Provided empty object: 400: 'You should not pass empty object'
- Destination not provided: 400: 'Destination is required'
- Message not provided: 400: 'Message is required'
- Only accept strings: 400: 'Only strings allowed'
- `messageapp` API internal error: 500: 'Internal Server Error'





## Postman collection with test

[Collection](messageapp/bin/Test.postman_collection.json)
