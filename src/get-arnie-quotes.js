const { httpGet } = require('./mock-http-interface');

const MESSAGE_MISSING = 'Message missing from response';

const mapArnieQuote = ({status, body}) => {
  try {
    const { message } = JSON.parse(body);

    if (!message) {
      return { 'FAILURE': MESSAGE_MISSING };
    }

    switch (status) {
      case 200:
        return { 'Arnie Quote': message };
      default:
        return { 'FAILURE': message };
    }
  } catch (err) {
    return { 'FAILURE': err.message };
  }
};

const getArnieQuotes = async (urls) => {
  const promises = urls.map(httpGet);

  const responses = await Promise.all(promises);

  const results = responses.map(mapArnieQuote);

  return results;
};

module.exports = {
  getArnieQuotes,
};
