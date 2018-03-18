var index = new Vue({
    el: '#content',
    data: {
        bookName: "Javascript",
        books: null,
        title: null,
        subtitle: null,
        authors: null,
        publisher: null,
        publishedDate: null,
        description: null,
        pages: 1,
        pageSize: 5,
        currentPage: 1,
        bookId: null,
        currentStar: null,

    },
    methods: {
        search: function () {
            var self = this;
            var param = {
                startIndex: self.startIndex,
                maxResults: self.pageSize
            };
            var bookName = replaceAll(self.bookName, " ", "+");
            console.log(bookName);
            $.ajax({
                type: 'GET',
                url: 'https://www.googleapis.com/books/v1/volumes?q=' + bookName,
                data: param,
                success: function (response) {
                    //console.log(JSON.stringify(response));
                    if (response) {
                        self.books = response.items;
                        console.log(response.items.length);
                        console.log(response.totalItems);
                        self.pages = Math.ceil((parseInt(response.totalItems) / parseInt(self.pageSize)));
                    }
                },
                dataType: "json",
                async: true
            });
        },
        bookDetails: function (index) {
            var self = this;
            console.log(index);
            self.title = self.books[index].volumeInfo.title;
            self.subtitle = self.books[index].volumeInfo.subtitle;
            self.authors = self.books[index].volumeInfo.authors;
            self.publisher = self.books[index].volumeInfo.publisher;
            self.publishedDate = self.books[index].volumeInfo.publishedDate;
            self.description = self.books[index].volumeInfo.description;
            self.bookId = self.books[index].id;
            self.getStars();
            $('#bookDetails').modal('show');
        },
        setPage: function (index) {
            var self = this;
            self.currentPage = index + 1;
            self.startIndex = (index + 1) * self.pageSize;
            self.search();
        },
        nextPage: function () {
            var self = this;
            self.currentPage += 1;
            self.startIndex = self.currentPage * self.pageSize;
            self.search();
        },
        previusPage: function () {
            var self = this;
            self.currentPage -= 1;
            self.startIndex = self.currentPage * self.pageSize;
            self.search();
        },
        newSearch: function () {
            var self = this;
            self.startIndex = 1;
            self.currentPage = 1;
            self.search();
        },
        getStars: function () {
            var self = this;
            if (localStorage.getItem(self.bookId) !== "undefined") {
                self.currentStar = localStorage.getItem(self.bookId);
            } else {
                self.currentStar = localStorage.getItem(self.bookId);
            }
        },
        setStar: function (star) {
            var self = this;
            localStorage.setItem(self.bookId, star);
            self.getStars();
        }
    },
    created: function () {

    }
})