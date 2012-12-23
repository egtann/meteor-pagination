Meteor Pagination
==============================================

This enables pagination in your Meteor app.

### Basics

In the client:
```js
Pagination.create(prependRoute, collectionCount, currentPage, resultsPerPage);
```

For example, set this in the client:

```js
var People = new Meteor.Collection('people');
for (var i=0; i<8; i++)
  People.insert({name: 'Jim'});

Template.browse.pagination = function () {
  return Pagination.create('/browse', People.find({}).count(), 2, 2);
}
```

Using it in the template:

```js
{{{pagination}}}
```

Inserts this into the page:

```html
<a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a>
```

It's smart enough to know when not to include Previous and Next links, to append a trailing slash to the prepended route when necessary, and to determine the total number of pages.

### To be done

  - Reactivity
  - Document how it integrates with meteor-router
  - Enable infinite scrolling
  - Styling options
  - Handle the actual pagination (more than just the numbers and links!)
