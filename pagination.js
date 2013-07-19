var Pagination = function() {
  var _style = 'one-of-x';
  var _currentPage = 1;
  var _perPage = 10;
}

// Accessible functions
Pagination.prototype.links = function(prependRoute, cursorCount, options) {
  var self = this;

  prependRoute = prependRoute.toString();
  self._setOptions(options);
  var totalPages = self.totalPages(cursorCount, self.perPage());

  if (self._checkVars(self.currentPage(), totalPages))
    return self._createHTML(prependRoute, self.currentPage(), totalPages);
}

Pagination.prototype.collection = function(cursor, options) {
  this._setOptions(options);
  var perPage = this.perPage();
  var currentPage = this.currentPage();

  return cursor.slice((currentPage - 1) * perPage, currentPage * perPage);
}

Pagination.prototype.totalPages = function(cursorCount, perPage) {
  var totalPages, remainder;

  remainder = cursorCount / perPage % 1
  if (remainder !== 0)
    totalPages = cursorCount / perPage - remainder + 1;
  else
    totalPages = cursorCount / perPage
  return totalPages;
}

// Getter and setter functions
Pagination.prototype._setOptions = function(options) {
  if (options) {
    this.currentPage(options.currentPage);
    this.perPage(options.perPage);
    this.style(options.style);
  }
}

Pagination.prototype.style = function(style) {
  if (style)
    return this._style = style;
  else
    return this._style;
}

Pagination.prototype.currentPage = function(currentPage) {
  if (currentPage)
    return this._currentPage = currentPage;
  else
    return this._currentPage;
}

Pagination.prototype.perPage = function(perPage) {
  if (perPage)
    return this._perPage = perPage;
  else
    return this._perPage;
}

// Internal, don't use
Pagination.prototype._checkVars = function(currentPage, totalPages) {
  if (totalPages <= 0 || currentPage <= 0 || !currentPage || !totalPages)
    throw new Error('Error: Illegal current page or total pages');
  if (currentPage > totalPages || currentPage === 0)
    throw new Error('Error: Current page cannot be less than total pages and cannot equal 0');
  return true;
}

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
      html += '<a href="' + prependRoute + prevPage + '">Prev</a> ';
    }
    html += currentPage + ' of ' + totalPages;
    if (currentPage < totalPages) {
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
      if (i !== currentPage)
        html += '<li><a href="' + prependRoute + i + '">' + i + '</a></li>';
      else
        html += '<li class="active"><a href="' + prependRoute + i + '">' + i + '</a></li>';
    }
    if (currentPage < totalPages) {
      html += '<li><a href="' + prependRoute + nextPage + '">»</a></li>';
    }
  }
  html += '</ul>';
  html += '</div>';
  return html;
}

this.Pagination = new Pagination();
