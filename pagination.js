var Pagination = function() {
  var _style = 'one-of-x';
}

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

Pagination.prototype.style = function(style) {
  if (style)
    return this._style = style;
  else
    return this._style;
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

  var prevPage = parseInt(currentPage) - 1;
  var nextPage = parseInt(currentPage) + 1;
  if (this._style === 'bootstrap')
    return this._bootstrap(prependRoute, currentPage, totalPages, prevPage, nextPage, html);
  else
    return this._oneOfX(prependRoute, currentPage, totalPages, prevPage, nextPage, html);
}

// Style 'one-of-x'
Pagination.prototype._oneOfX = function(prependRoute, currentPage, totalPages, prevPage, nextPage, html) {
  html += '<div class="pagination">';
  if (totalPages !== 1) {
    if (currentPage > 1) {
      // Previous button
      html += '<a href="' + prependRoute + prevPage + '">Prev</a> ';
    }
    // Main section
    html += currentPage + ' of ' + totalPages;
    if (currentPage < totalPages) {
      // Next button
      html += ' <a href="' + prependRoute + nextPage + '">Next</a>';
    }
  } else {
    // No buttons
    html += currentPage + ' of ' + totalPages;
  }
  html += '</div>';
  return html;
}

// Style 'bootstrap'
Pagination.prototype._bootstrap = function(prependRoute, currentPage, totalPages, prevPage, nextPage, html) {
  html += '<div class="pagination">';
  html += '<ul>';
  if (totalPages !== 1) {
    if (currentPage > 1) {
      html += '<li><a href="' + prependRoute + prevPage + '">«</a></li>';
    }
    for (var i = currentPage - 1; (i <= totalPages) && (i - currentPage < 4); i++) {
      if (i < 1) continue;
      if (i == currentPage)
        html += '<li><a href="' + prependRoute + i + '" class="active">' + i + '</a></li>';
      else
        html += '<li><a href="' + prependRoute + i + '">' + i + '</a></li>';
    }
    if (currentPage < totalPages) {
      html += '<li><a href="' + prependRoute + nextPage + '">»</a></li>';
    }
  }
  html += '</ul>';
  html += '</div>';
  return html;
}

var Pagination = new Pagination();
