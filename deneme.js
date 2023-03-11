const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "b0f41ab4",
  apiSecret: "P3c3E2VLAg8IVgwM",
});

const from = "Vonage APIs";
const to = "905304652251";
const text = "A text message sent using the Vonage SMS API";

async function sendSMS() {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

sendSMS();
