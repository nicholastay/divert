# divert

A GitHub pages-powered link shortener.

Fork this repository (and, optionally, add a CNAME file) to begin. Add/remove short-links in `redir_links.js`, prefrably by using the Node.js tool provided (`node divert.js` to get started; of course you have to have Node.js installed to use this).

Edit `index.html` to include the `redir_to` Jekyll variable if you want the main page to redirect to a custom home page. By default, the home page will be a page displaying all the short-links available.

Essentially, this needs to be added at the top of `index.html` for the home page redirect:

```
---
redir_to: https://nexerq.cf/
---
```


## License

ISC