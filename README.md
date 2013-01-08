Meteor Pagination
==============================================

This enables simple pagination in your Meteor app. There are two key parts:

  1. Limiting cursor results to only what should be displayed on the current page.
  2. Displaying page links at the bottom, the format of which can be modified using styles.

## Basics

Displaying only the current page's cursor results is easy. In the client, use Pagination.collection(). This will enable you to insert just those results into each page, and it automatically changes when the page changes.

```js
Pagination.collection(cursor, options);
```

It's important to note that cursor is actually the returned values of Meteor.Collection.find(). So if you have a collection named People, you might use Pagination.collection() like this:

```js
Pagination.collection(People.find({}).fetch(), options);
```

To display page links on the page (typically at the bottom), use Pagination.links() in the client like so:

```js
Pagination.links(prependRoute, cursorCount, options);
```

Pagination.create() returns something like this:

```html
<div class="pagination">
    <a href="/browse/1">Prev</a> 2 of 4 <a href="/browse/3">Next</a>
</div>
```

It's smart enough to know when not to include Previous and Next links, to append a trailing slash to the prepended route when necessary, and to determine the total number of pages.

## Options

It's recommended that you set options before or with your first call to either Pagination.collection() or Pagination.links(), as changing them after calling one or the other will have undesired effects. Once set on either, the options will apply to both.

### currentPage

Set the current page by using {currentPage: 1} as your options to Pagination.collection() or Pagination.links(). This will determine which results are displayed as well as influence the links at the bottom of the page.

Optionally, it can be set directly like this:

    Pagination.currentPage(1);
    Pagination.collection(cursor);

The currentPage option defaults to 1.

### perPage

Set the number of results you want to display per page. This will impact both Pagination.collection() and Pagination.links().

    Pagination.perPage(10);

The perPage option defaults to 10.

### Style

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

  Template.browse.results = function () {
    return Pagination.collection(People.find({}).fetch());
  }

  Template.browse.pagination = function () {
    // Pagination.links(prependRoute, cursorCount, options);
    return Pagination.links('/browse', People.find({}).count(), {currentPage: Session.get('page'), perPage: 8});
  }
}
```

In the template:

```handlebars
<template name="browse">
  {{#each results}}
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

#### collection

```js
Pagination.collection(cursor, options)
```

Cursor is the result of running Meteor.Collection.find().

#### links 

```js
Pagination.links(prependRoute, cursorCount, options)
```

This generates the page numbers and previous/next buttons.

prependRoute: string.
cursorCount, currentPage, and perPage: integers.

#### totalPages

```js
Pagination.totalPages(cursorCount, perPage)
```

Calculates the total number of pages required for your cursor given how many you want to display on each page. Use this to build out custom solutions, piggybacking on this package's calculations.

cursorCount and perPage are integers.

#### style

```js
Pagination.style(); // Get style
Pagination.style('bootstrap'); // Set style
```

Use this to change the style of the outputted HTML from Pagination.links() or to check the current style. Pass in no parameter to return the current style.

For example, Pagination.style('bootstrap') would change the style. Pagination.style() will return the current style.

style: string, either 'one-of-x' or 'bootstrap'. Defaults to 'one-of-x'.

#### currentPage

```js
Pagination.currentPage(); // Get currentPage
Pagination.currentPage(5); // Set currentPage
```

#### perPage

```js
Pagination.perPage(); // Get perPage
Pagination.perPage(15); // Set perPage
```

## To be done

  - Reactivity
  - Enable infinite scrolling
