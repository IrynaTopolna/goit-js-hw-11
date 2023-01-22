import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32988992-2bc6a6b6a626cf7787248a3b3';
const REQUEST_OPT = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class PhotoApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhoto() {
    try {
      const resp = await axios.get(
        `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&${REQUEST_OPT}&page=${this.page}&per_page=${this.perPage}`
      );

      this.page += 1;
      const data = await resp.data;
      console.log(resp);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
