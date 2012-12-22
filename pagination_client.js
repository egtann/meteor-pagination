var Pagination = function() {}

Pagination.prototype.create = function(prependRoute, currentPage, totalPages) {
  var self = this;

  prependRoute = prependRoute.toString();
  currentPage = parseInt(currentPage);
  totalPages = parseInt(totalPages);

  if (self._checkVars(currentPage, totalPages))
    return self._createHTML(prependRoute, currentPage, totalPages);
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

  // No buttons
  if (totalPages !== 1) {
    // Previous button
    if (currentPage > 1) {
      var prevPage = parseInt(currentPage) - 1;
      html += '<a href="' + prependRoute + prevPage + '">Prev</a> ';
    }
    // Main section
    html += currentPage + ' of ' + totalPages;
    // Next button
    if (currentPage < totalPages) {
      var nextPage = parseInt(currentPage) + 1;
      html += ' <a href="' + prependRoute + nextPage + '">Next</a>';
    }
  } else {
    html += currentPage + ' of ' + totalPages;
  }
  return html;
}

var Pagination = new Pagination();
