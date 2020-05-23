const request = require('request');
const url = 'https://apidemo.theysay.io/api/v1/sentiment';

// Use command line to pass in text as command-line 'INPUT'
const textInput = process.argv
  .filter((value, i) => i !== 0 && i !== 1)
  .join(' ');
console.log(textInput);

// body pass in later to the request
const body = {
  text: textInput,
  level: 'entity',
};

request(
  {
    method: 'POST',
    url: url,
    headers: {
      //'Accept-Encoding': 'gzip, deflate, br',
      Accept: 'application/json',
      'Accept-Language':
        'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
      //'Content-Length': 42,
      Connection: 'keep-alive',
      'Content-Type': 'application/json; charset=UTF-8',
      Cookie:
        ' _ga=GA1.2.1997831900.1589033229; _gid=GA1.2.939064873.1589033229',
      Host: 'apidemo.theysay.io',
      Origin: 'https://apidemo.theysay.io',
      Referer: 'https://apidemo.theysay.io/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
    },

    // Convert the type of command-line 'INPUT'
    body: JSON.stringify(body),
  },
  function (error, response, data) {
    error ? console.log(error) : console.log('Status:', response.statusCode);

    //console.log('Headers:', JSON.stringify(response.headers));

    // Data Type is 'STRING'
    //console.log('Response:', data);

    // use JSON.parse to convert data into an OBJECT so that i can get the Key and Value
    const value = JSON.parse(data);

    //log the 'parsed' value as OBJECT out
    //console.log('Response:', value);

    // Object.values() returns an Array of Values,but no need here
    const info = value[0].sentiment;

    // convert returned float number to percentage
    const confidencePercentage = (info.confidence * 100).toFixed(2) + '%';
    const positivePercentage = (info.positive * 100).toFixed(2) + '%';
    const negativePercentage = (info.negative * 100).toFixed(2) + '%';
    const neutralPercentage = (info.neutral * 100).toFixed(2) + '%';

    //use Conditional operators
    textInput
      ? console.log(`Your text has the following sentiment: ${info.label} (with ${confidencePercentage} certainty)
     ${positivePercentage} positive ${negativePercentage} negative ${neutralPercentage} neutral`)
      : '';
  },
);
