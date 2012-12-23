Tinytest.add("Prev and Next Links", function(test) {
  test.equal(Pagination.create('/browse', People.find({}).count(), 1, 2), '<div class="pagination">1 of 4 <a href="/browse/2">Next</a></div>');
  test.equal(Pagination.create('/browse/', People.find({}).count(), 1, 2), '<div class="pagination">1 of 4 <a href="/browse/2">Next</a></div>');
  test.equal(Pagination.create('/search/browse', People.find({}).count(), 1, 2), '<div class="pagination">1 of 4 <a href="/search/browse/2">Next</a></div>');
  test.equal(Pagination.create('/browse', People.find({}).count(), 2, 4), '<div class="pagination"><a href="/browse/1">Prev</a> 2 of 2</div>');
  test.equal(Pagination.create('/browse', People.find({}).count(), 2, 2), '<div class="pagination"><a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a></div>');
  test.equal(Pagination.create('/browse', People.find({}).count(), 1, 8), '<div class="pagination">1 of 1</div>');
});

Tinytest.add("Total pages", function(test) {
  // Pagination.totalPages(prepended route, collection, number per page)
  test.equal(Pagination.totalPages(People.find({}).count(), 4), 2);
  test.equal(Pagination.totalPages(People.find({}).count(), 3), 3);
  test.equal(Pagination.totalPages(People.find({}).count(), 1), 8);
  test.equal(Pagination.totalPages(People.find({}).count(), 7), 2);
});

Tinytest.add("Styles", function(test) {
  Pagination.style('one-of-x');
  test.equal(Pagination.create('/browse', People.find({}).count(), 1, 2), '<div class="pagination">1 of 4 <a href="/browse/2">Next</a></div>');

  Pagination.style('bootstrap');
  test.equal(Pagination.create('/browse', People.find({}).count(), 1, 2),
    '<div class="pagination">' +
      '<ul>' +
        '<li><a href="/browse/1" class="active">1</a></li>' +
        '<li><a href="/browse/2">2</a></li>' +
        '<li><a href="/browse/3">3</a></li>' +
        '<li><a href="/browse/4">4</a></li>' +
        '<li><a href="/browse/2">»</a></li>' +
      '</ul>' +
    '</div>'
  );

  test.equal(Pagination.create('/browse', People.find({}).count(), 2, 1),
    '<div class="pagination">' +
      '<ul>' +
        '<li><a href="/browse/1">«</a></li>' +
        '<li><a href="/browse/1">1</a></li>' +
        '<li><a href="/browse/2" class="active">2</a></li>' +
        '<li><a href="/browse/3">3</a></li>' +
        '<li><a href="/browse/4">4</a></li>' +
        '<li><a href="/browse/5">5</a></li>' +
        '<li><a href="/browse/3">»</a></li>' +
      '</ul>' +
    '</div>'
  );

  test.equal(Pagination.create('/browse', People.find({}).count(), 4, 1),
    '<div class="pagination">' +
      '<ul>' +
        '<li><a href="/browse/3">«</a></li>' +
        '<li><a href="/browse/3">3</a></li>' +
        '<li><a href="/browse/4" class="active">4</a></li>' +
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
  this._collection = {docs: []};
}

Collection.prototype.insert = function(hash) {
  this._collection.docs.push(hash);
  return this;
}

Collection.prototype.find = function(hash) {
  return this;
}

Collection.prototype.count = function() {
  return this._collection.docs.length;
}

// Set up the fake People collection
var People = new Collection('people');
for (var i=0; i<8; i++)
  People.insert({name: 'Jim'});
