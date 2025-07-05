# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter 
- GET /profile/view
- PATCH /profile/edit
- PATCH /prosile/password

## connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userConnectionRequestRouter
- GET /user/connections
- GET /user/request/received
- GET /user/feed - get you the profile of other users on platform

Status : ignoured, intrested, accepted, rejected
