const fetchAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSONData = await response.json();
  return JSONData;
};

export default fetchAPI;
