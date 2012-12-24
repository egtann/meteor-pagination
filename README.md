Meteor Pagination
==============================================

This enables pagination in your Meteor app.

## Basics

In the client:

```js
Pagination.create(prependRoute, collectionCount, currentPage, resultsPerPage);
```

Pagination.create() returns something like this:

```html
<div class="pagination">
    <a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a>
</div>
```

It's smart enough to know when not to include Previous and Next links, to append a trailing slash to the prepended route when necessary, and to determine the total number of pages.

## Styles

There are two styles built in, which you can set using Pagination.style() like so:

    Pagination.style('bootstrap');

  1. 'one-of-x' (default)

    ```html
    <div class="pagination"><a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a></div>
    ```
  
  2. 'bootstrap', to work with [Bootstrap pagination](http://twitter.github.com/bootstrap/components.html#pagination) 

    ```html
    <div class="pagination">
      <ul>
        <li><a href="/browse/1">«</a></li>
        <li><a href="/browse/1">1</a></li>
        <li><a href="/browse/2" class="active">2</a></li>
        <li><a href="/browse/3">3</a></li>
        <li><a href="/browse/4">4</a></li>
        <li><a href="/browse/3">»</a></li>
      </ul>
    </div>
    ``` 

## Demonstration

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
<div class="pagination"><a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a></div>
```

If you're on the first page, there's no Previous button. If you're on the last page, there's no next button. If there's only one page, there are no buttons.

## API

#### create

```js
Pagination.create(prependRoute, collectionCount, currentPage, perPage)
```

This generates the page numbers and previous/next buttons.

prependRoute: string.
collectionCount, currentPage, and perPage: integers.

#### totalPages

```js
Pagination.totalPages(collectionCount, perPage)
```

Calculates the total number of pages required for your collection given how many you want to display on each page. Use this to build out custom solutions, piggybacking on this package's calculations.

collectionCount and perPage are integers.

#### style

```js
Pagination.style(style)
```

Use this to change the style of the outputted HTML from Pagination.create() or to check the current style. Pass in no parameter to return the current style.

For example, Pagination.style('bootstrap') would change the style. Pagination.style() will return the current style.

style: string, either 'one-of-x' or 'bootstrap'. Defaults to 'one-of-x'.

## To be done

  - Reactivity
  - Enable infinite scrolling
  - Handle the actual pagination (more than just the numbers and links!)
