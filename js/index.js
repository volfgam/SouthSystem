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
        description: null
    },
    methods: {
        search: function () {
            var self = this;
            var param = null;
            var bookName = replaceAll(self.bookName, " ", "+");
            console.log(bookName);
            $.ajax({
                type: 'GET',
                url: 'https://www.googleapis.com/books/v1/volumes?q=' + bookName,
                data: param,
                success: function (response) {
                    //console.log(JSON.stringify(response));
                    if (response) {
                       self.books = response.items
                    }
                },
                dataType: "json",
                async: true
            });
        },
        bookDetails: function(index) {
            var self = this;
            console.log(index);
            self.title = self.books[index].volumeInfo.title;
            self.subtitle = self.books[index].volumeInfo.subtitle;
            self.authors = self.books[index].volumeInfo.authors;
            self.publisher = self.books[index].volumeInfo.publisher;
            self.publishedDate = self.books[index].volumeInfo.publishedDate;
            self.description = self.books[index].volumeInfo.description;
            
            $('#bookDetails').modal('show');
        }
    },
    created: function () {

    }
})