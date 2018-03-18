var index = new Vue({
    el: '#content',
    data: {
        bookName: "Lord of the rings",
        books: null
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
        }
    },
    created: function () {

    }
})