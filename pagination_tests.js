Tinytest.add("Prev and Next Links", function(test) {
  test.equal(Pagination.create('/browse', 1, 5), '1 of 5 <a href="/browse/2">Next</a>');
  test.equal(Pagination.create('/browse/', 1, 5), '1 of 5 <a href="/browse/2">Next</a>');
  test.equal(Pagination.create('/search/browse', 1, 5), '1 of 5 <a href="/search/browse/2">Next</a>');
  test.equal(Pagination.create('/browse', 5, 5), '<a href="/browse/4">Prev</a> 5 of 5');
  test.equal(Pagination.create('/browse', 3, 5), '<a href="/browse/2">Prev</a> 3 of 5 <a href="/browse/4">Next</a>');
  test.equal(Pagination.create('/browse', 1, 1), '1 of 1');
});
