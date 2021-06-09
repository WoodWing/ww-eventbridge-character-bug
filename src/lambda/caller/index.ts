
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { Handler } from 'aws-lambda';

export const handler: Handler = async (_event, _context, _callback): Promise<void> => {
  const client = new EventBridgeClient({});
  const command = new PutEventsCommand({
    Entries: [{
      Source: 'test-source',
      DetailType: 'test-detail-type',
      Detail: JSON.stringify({ test: 'test without' }),
      EventBusName: process.env.eventBusName,
    },
    {
      Source: 'test-source',
      DetailType: 'test-detail-type',
      Detail: JSON.stringify({ test: 'test with invalid ￾ characters' }),
      EventBusName: process.env.eventBusName,
    }],
  });

  try {
    const result = await client.send(command);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
