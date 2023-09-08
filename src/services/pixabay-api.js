import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '29394267-31e8822dcf81ed000db5cdbcd',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

axios.defaults.baseURL = `https://pixabay.com/api`;

export async function getImages(query, page) {
  const response = await axios.get(`/?q=${query}&page=${page}&${searchParams}`);
  return response.data;
}
