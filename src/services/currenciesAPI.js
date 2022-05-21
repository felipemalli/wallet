const getCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  return request.json();
};

export default getCurrencies;
