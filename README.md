Meteor Pagination
==============================================

This enables pagination in your Meteor app.

### Basics

In the client:
```js
Pagination.create(prependRoute, currentPage, totalPages);
```

For example, set this in the client:

```js
Template.browse.pagination = function () {
  return Pagination.create('/browse', 3, 5);
}
```

Using it in the template:

```js
{{{pagination}}}
```

Inserts this into the page:

```html
<a href="/browse/2">Prev</a> 3 of 5 <a href="/browse/4">Next</a>
```

### To be done

  - Pass in the collection to be paginated rather than the number of pages
  - Styling options
