Tinytest.add("Generate page links", function(test) {
  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 1, perPage: 2}),
            '<div class="pagination">' +
              '1 of 4 <a href="/browse/2">Next</a>' +
            '</div>');
  test.equal(Pagination.links('/browse/', People.find({}).count(), {currentPage: 1, perPage: 2}),
            '<div class="pagination">' +
              '1 of 4 <a href="/browse/2">Next</a>' + 
            '</div>');
  test.equal(Pagination.links('/search/browse', People.find({}).count(), {currentPage: 1, perPage: 2}),
            '<div class="pagination">' +
              '1 of 4 <a href="/search/browse/2">Next</a>' +
            '</div>');
  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 2, perPage: 4}),
            '<div class="pagination">' +
              '<a href="/browse/1">Prev</a> 2 of 2' +
            '</div>');
  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 2, perPage: 2}),
            '<div class="pagination">' +
              '<a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a>' +
            '</div>');
  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 1, perPage: 8}),
            '<div class="pagination">' +
              '1 of 1' +
            '</div>');
  test.equal(Pagination.links('/browse', People.find({}).count()),
            '<div class="pagination">' +
              '1 of 1' +
            '</div>');
});

Tinytest.add("Paginate collection", function(test) {
  test.equal(Pagination.collection(People.find({}).fetch(), {currentPage: 1, perPage: 2}), People.collection.docs.slice(0, 2));
  test.equal(Pagination.collection(People.find({}).fetch(), {currentPage: 2, perPage: 6}), People.collection.docs.slice(6, 12));
});

Tinytest.add("Total pages", function(test) {
  // Pagination.totalPages(cursor, perPage)
  test.equal(Pagination.totalPages(People.find({}).count(), 4), 2);
  test.equal(Pagination.totalPages(People.find({}).count(), 3), 3);
  test.equal(Pagination.totalPages(People.find({}).count(), 1), 8);
  test.equal(Pagination.totalPages(People.find({}).count(), 7), 2);
});

Tinytest.add("Styles", function(test) {
  Pagination.style('one-of-x');
  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 1, perPage: 2}),
    '<div class="pagination">' +
      '1 of 4 <a href="/browse/2">Next</a>' +
    '</div>');

  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 1, perPage: 2, style: 'bootstrap'}),
    '<div class="pagination">' +
      '<ul>' +
        '<li class="active"><a href="/browse/1">1</a></li>' +
        '<li><a href="/browse/2">2</a></li>' +
        '<li><a href="/browse/3">3</a></li>' +
        '<li><a href="/browse/4">4</a></li>' +
        '<li><a href="/browse/2">»</a></li>' +
      '</ul>' +
    '</div>'
  );

  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 2, perPage: 1, style: 'bootstrap'}),
    '<div class="pagination">' +
      '<ul>' +
        '<li><a href="/browse/1">«</a></li>' +
        '<li><a href="/browse/1">1</a></li>' +
        '<li class="active"><a href="/browse/2">2</a></li>' +
        '<li><a href="/browse/3">3</a></li>' +
        '<li><a href="/browse/4">4</a></li>' +
        '<li><a href="/browse/5">5</a></li>' +
        '<li><a href="/browse/3">»</a></li>' +
      '</ul>' +
    '</div>'
  );

  test.equal(Pagination.links('/browse', People.find({}).count(), {currentPage: 4, perPage: 1, style: 'bootstrap'}),
    '<div class="pagination">' +
      '<ul>' +
        '<li><a href="/browse/3">«</a></li>' +
        '<li><a href="/browse/3">3</a></li>' +
        '<li class="active"><a href="/browse/4">4</a></li>' +
        '<li><a href="/browse/5">5</a></li>' +
        '<li><a href="/browse/6">6</a></li>' +
        '<li><a href="/browse/7">7</a></li>' +
        '<li><a href="/browse/5">»</a></li>' +
      '</ul>' +
    '</div>'
  );
});

// Prepare a bare bones collection mock for testing
var Collection = function(name) {
  this.name = name;
  this.collection = {docs: []};
}

Collection.prototype.insert = function(hash) {
  this.collection.docs.push(hash);
  return this;
}

Collection.prototype.find = function(hash) {
  return this;
}

Collection.prototype.fetch = function() {
  return this;
}

Collection.prototype.count = function() {
  return this.collection.docs.length;
}

Collection.prototype.slice = function(start, end) {
  return this.collection.docs.slice(start, end);
}

// Set up the fake People collection
var People = new Collection('people');
for (var i=0; i<8; i++)
  People.insert({name: 'Jim'});
