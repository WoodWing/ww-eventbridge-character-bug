import * as path from 'path';
import { EventBus, Rule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { App, Construct, Duration, Stack, StackProps } from '@aws-cdk/core';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const eventBus = new EventBus(this, 'eventBus');

    const callerLambda = new NodejsFunction(this, 'caller', {
      entry: path.join(__dirname, 'lambda/caller/index.ts'),
      environment: {
        eventBusName: eventBus.eventBusName,
      },
    });
    eventBus.grantPutEventsTo(callerLambda);

    const receivingLambda = new NodejsFunction(this, 'receiver', {
      entry: path.join(__dirname, 'lambda/receiver/index.ts'),
      deadLetterQueueEnabled: true,
      retryAttempts: 0,
      maxEventAge: Duration.seconds(60),
    });

    const rule = new Rule(this, 'eventRule', {
      eventBus: eventBus,
      eventPattern: {
        source: ['test-source'],
      },
    });
    rule.addTarget(new LambdaFunction(receivingLambda));
  }
}


const app = new App();

new MyStack(app, 'EventBridgeCharacterBug', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();