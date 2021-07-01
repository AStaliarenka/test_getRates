export default class GotService {

    constructor() {
      this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
  
      return await res.json();
    };
  
    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCaracter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCaracter(character);
    }
    getAllHouses() {
        return this.getResource('/houses?page=5&pageSize=10');
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }
    getAllBooks() {
        return this.getResource('/books?page=5&pageSize=10');
    }
    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    _transformCaracter(char) {
        return {
            name: char.name || "no data",
            gender: char.gender || "no data",
            born: char.born || "no data",
            died: char.died || "no data",
            culture: char.culture || "no data"
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

}