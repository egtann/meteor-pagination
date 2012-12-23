var Pagination = function() {}

Pagination.prototype.create = function(prependRoute, collectionCount, currentPage, perPage) {
  var self = this;

  prependRoute = prependRoute.toString();
  currentPage = parseInt(currentPage);
  totalPages = self.totalPages(collectionCount, perPage);

  if (self._checkVars(currentPage, totalPages))
    return self._createHTML(prependRoute, currentPage, totalPages);
}

Pagination.prototype.totalPages = function(collectionCount, perPage) {
  var totalPages, remainder;

  remainder = collectionCount / perPage % 1
  if (remainder !== 0)
    totalPages = collectionCount / perPage - remainder + 1;
  else
    totalPages = collectionCount / perPage
  return totalPages;
}

// Internal, don't use
Pagination.prototype._checkVars = function(currentPage, totalPages) {
  if (totalPages <= 0 || currentPage <= 0 || !currentPage || !totalPages)
    throw new Error('Error: Illegal current page or total pages');
  if (currentPage > totalPages || currentPage === 0)
    throw new Error('Error: Current page cannot be less than total pages and cannot equal 0');
  return true;
}

// Internal, don't use
Pagination.prototype._createHTML = function(prependRoute, currentPage, totalPages) {
  var html = '';

  var trailingSlash = /\/$/;
  if (!trailingSlash.test(prependRoute))
    prependRoute += '/';

  if (totalPages !== 1) {
    if (currentPage > 1) {
      // Previous button
      var prevPage = parseInt(currentPage) - 1;
      html += '<a href="' + prependRoute + prevPage + '">Prev</a> ';
    }
    // Main section
    html += currentPage + ' of ' + totalPages;
    if (currentPage < totalPages) {
      // Next button
      var nextPage = parseInt(currentPage) + 1;
      html += ' <a href="' + prependRoute + nextPage + '">Next</a>';
    }
  } else {
    // No buttons
    html += currentPage + ' of ' + totalPages;
  }
  return html;
}

var Pagination = new Pagination();
