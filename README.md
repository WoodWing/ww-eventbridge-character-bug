# WoodWing EventBridge Character bug sample project

The stack in this repository creates two lambda functions and a EventBridge bus. The `caller` lambda puts two messages on the bus but only 1 is received by the `receiver` lambda. This can be tested by calling the `caller` lambda directly in the Lambda console and reviewing the log output for both the lambdas.

EventBridge reports no errors when putting the messages on the bus. As our application didn't receive any errors this issue was hard to debug for us.

The only difference between the message is the ￾ (0xfffe) BOM marker. We know this is a weird situation but somehow a customers of ours added this character to the input. Our code was able to handle this just fine but the process stopped in the middle because our lambda was never called. We would expect the lambda to be called with the event or an error when putting the event on the bus. 

## Deploying the stack

### Install dependencies

Make sure you have NodeJS installed.

Then install all the dependencies.

```bash
yarn install
```

### Deploy

First make sure the AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_SESSION_TOKEN environment variables are set. You could do this with a tool like [assume-role](https://github.com/remind101/assume-role).

Then run the following command to deploy:

```bash
npm run deploy
```
