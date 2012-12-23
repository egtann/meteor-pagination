Meteor Pagination
==============================================

This enables pagination in your Meteor app.

### Basics

In the client:

```js
Pagination.create(prependRoute, collectionCount, currentPage, resultsPerPage);
```

It's smart enough to know when not to include Previous and Next links, to append a trailing slash to the prepended route when necessary, and to determine the total number of pages.

### Demonstration

I'll be hooking this up to [router-with-notifications](https://github.com/egtann/meteor-router) to keep track of the current page, but it should work similarly with any other router.

```js
if (Meteor.isClient) {
  Meteor.Router.add({
    '/browse/:page': function (page) {
      // We want to get the current page to pass it into Pagination
      Session.set('page', page);
      return 'browse';
    }
  });

  Template.browse.pagination = function () {
    // Pagination.create(prependRoute, collectionCount, currentPage, resultsPerPage);
    return Pagination.create('/browse', People.find({}).count(), Session.get('page'), 8);
  }
}
```

In the template:

```handlebars
<template name="browse">
  {{#each people}}
    {{> person}}
  {{/each}}

  {{{pagination}}}
</template>
```

Note that pagination is surrounded by three '{{{' brackets. This inserts the page numbers into the page as HTML, rather than as text.

If all goes well, you should see something like this on the page:

```html
<a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a>
```

If you're on the first page, there's no Previous button. If you're on the last page, there's no next button. If there's only one page, there are no buttons.

### To be done

  - Reactivity
  - Enable infinite scrolling
  - Styling options
  - Handle the actual pagination (more than just the numbers and links!)
