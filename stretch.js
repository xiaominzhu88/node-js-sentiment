const request = require('request');
const url = 'https://apidemo.theysay.io/api/v1/sentiment';

request(
  {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      //'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language':
        'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
      Connection: 'keep-alive',
      //'Content-Length': 42,
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
    body: '{  "text": "run and smile",  "level": "entity" }',
  },

  function (error, response, data) {
    error ? console.log(error) : console.log('Status:', response.statusCode);

    console.log('Headers:', JSON.stringify(response.headers));

    //console.log('Response:', typeof(data)); // Data Type is 'STRING'

    const value = JSON.parse(data);
    // use JSON.parse to convert data into an OBJECT so that i can get the Key and Value

    console.log('Response:', value);
    //log the 'parsed' value as OBJECT out

    console.log(Object.values(value)[0]);
    // Object.values() returns an Array of Values

    const info = Object.values(value)[0].sentiment;

    const confidencePercentage = (info.confidence * 100).toFixed(2) + '%';
    // convert returned float number to percentage
    const positivePercentage = (info.positive * 100).toFixed(2) + '%';
    const negativePercentage = (info.negative * 100).toFixed(2) + '%';
    const neutralPercentage = (info.neutral * 100).toFixed(2) + '%';

    const myArgs = process.argv;
    // command line arguments => input

    myArgs[2]
      ? //use Conditional operators to make the code simple
        console.log(`Your text has the following sentiment: ${info.label} (with ${confidencePercentage} certainty)
     ${positivePercentage} positive ${negativePercentage} negative ${neutralPercentage} neutral`)
      : '';
  },
);
