
import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context, _callback): Promise<void> => {
  console.log(event);
  console.log(context);
};
