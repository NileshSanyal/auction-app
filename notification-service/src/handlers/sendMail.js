import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendMail(event, context) {

  const record = event.Records[0];
  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    // you need to manually verify source email through aws management console
    Source: 'nil2take1@gmail.com', 
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body
        } 
      },
      Subject: {
        Data: subject
      }
    }
  };
  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  } catch(error) {
    console.error(error);
  }
}

export const handler = sendMail;


