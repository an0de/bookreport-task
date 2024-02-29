const library = {
  books: [],

  addBook(name, author, year, genre, pagesCount) {
    this.books.push({ name, author, year, genre, pagesCount });
  },

  removeBook(name) {
    const index = this.books.map((book) => book.name).indexOf(name);
    if (index !== -1) {
      const [book] = this.books.splice(index, 1);
      return book;
    }
    return null;
  },

  findBooksByAuthor(author) {
    return this.books.filter((book) => book.author === author);
  },

  filterBooksByGenre(genre) {
    return this.books.filter((book) => book.genre === genre);
  },

  genreReport() {
    const genreStat = this.books.reduce((acc, { genre }) => {
      if (!Object.hasOwn(acc, genre)) {
        acc[genre] = 0;
      }
      acc[genre] += 1;
      return acc;
    }, {});
    const report = Object.entries(genreStat)
      .map(([genre, bookCount]) => `${genre}: ${bookCount}`)
      .join('\n');
    return report;
  },

  averagePagesReport() {
    const pagesTotal = this.books.reduce((acc, { pagesCount }) => acc + pagesCount, 0);
    return Math.round(pagesTotal / this.books.length);
  },

  yearReport() {
    const sorted = this.books.map((book) => book).sort((a, b) => Math.sign(a.year - b.year));
    const report = sorted.map((book) => Object.keys(book).map((key) => book[key]).join(' ')).join('\n');
    return report;
  },
};

library.addBook('Хоббит', 'Дж. Р. Р. Толкиен', 1937, 'Фэнтези', 310);
library.addBook('Гарри Поттер и философский камень', 'Дж. К. Роулинг', 1997, 'Фэнтези', 223);
library.addBook('1984', 'Джордж Оруэлл', 1949, 'Антиутопия', 328);

// Поиск книг по автору
console.log(library.findBooksByAuthor('Дж. Р. Р. Толкиен'));

// Фильтрация книг по жанру
console.log(library.filterBooksByGenre('Фэнтези'));

// Генерация отчета по количеству книг каждого жанра
console.log(library.genreReport());

// Генерация отчета по среднему количеству страниц
console.log(`Среднее количество страниц: ${library.averagePagesReport()}`);

// Удаление книги и вывод обновленной библиотеки
library.removeBook('1984'); console.log(library.books);
