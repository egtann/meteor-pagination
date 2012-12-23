Tinytest.add("Prev and Next Links", function(test) {
  test.equal(Pagination.create('/browse', People.find({}).count(), 1, 2), '1 of 4 <a href="/browse/2">Next</a>');
  test.equal(Pagination.create('/browse/', People.find({}).count(), 1, 2), '1 of 4 <a href="/browse/2">Next</a>');
  test.equal(Pagination.create('/search/browse', People.find({}).count(), 1, 2), '1 of 4 <a href="/search/browse/2">Next</a>');
  test.equal(Pagination.create('/browse', People.find({}).count(), 2, 4), '<a href="/browse/1">Prev</a> 2 of 2');
  test.equal(Pagination.create('/browse', People.find({}).count(), 2, 2), '<a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a>');
  test.equal(Pagination.create('/browse', People.find({}).count(), 1, 8), '1 of 1');
});

Tinytest.add("Total pages", function(test) {
  // Pagination.totalPages(prepended route, collection, number per page)
  test.equal(Pagination.totalPages(People.find({}).count(), 4), 2);
  test.equal(Pagination.totalPages(People.find({}).count(), 3), 3);
  test.equal(Pagination.totalPages(People.find({}).count(), 1), 8);
  test.equal(Pagination.totalPages(People.find({}).count(), 7), 2);
});

Tinytest.add("Support for multiple styles", function(test) {});

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
