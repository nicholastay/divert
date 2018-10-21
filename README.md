# divert

A GitHub pages-powered link shortener.

**New in v2!**: Now no JavaScript required - now harnessing the power of static-site generation through Jekyll as included with GitHub Pages!

**Updating from v1?**: Simply run `node divert.js upgrade` to migrate your old short-links to the new format.

## Start your own today!

To begin, simply fork this repository (and, optionally, add a CNAME file).

Add/remove short-links by creating 'diversions' (as below), but preferably by using the Node.js tool provided (`node divert.js` to get started; of course you have to have Node.js installed to use this tool).

As for the 'diversions' themselves, they must be in the `_diversions` folder as `<code>.md` files, with the content:

```
---
layout: divert
code: <short_code>
redir: <actual_url>
---
```


## Optional configuration

You may wish to edit `index.html` to include the `redir_to` Jekyll variable if you want **the main page to redirect to a custom home page** of your choosing. By default, the home page will be a listings-type page, displaying all the short-links available.

The following needs to be added to the top of the `index.html` file for the home page redirect:

```
---
redir_to: <your_own_homepage>
---
```


## License

ISC (full text available as `LICENSE` in the root of this repository.)
