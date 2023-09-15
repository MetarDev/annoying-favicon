
<h1 align="center">
	😸</br>
	Tabky.js
	</h1>
<p align="center">
A JS package for programmatically manipulating your app's favicon and title.
</p>

## About the library

tabky-js is a a convenience library for manipulating your app's favicon and title with full Typescript support.

You can use it to make your favicon / title dynamically react to what's happening on the page or make your app's favicon / title more noticeable when the user is not focused on your app's tab.

### What this library is?
- A way to add micro-interactions to your app, by dynamically changing the favicon and title depending on user's actions.
- A way to reflect your app's state in the favicon and title (by adding badges / notification icons to the favicon or changing the title to indicate some state to the user, i.e. "You have 1 new message").
- A way to changing the title / favicon when user tabs away from your app, to make your app more noticeable.

### What this library isn't?
- A way to add animations to your favicon.
- A way to add a video to your favicon.
- A way to annoy your users.

## Installation

```
npm install tabky-js
```

## Usage / API / Documentation

[View Demo](https://tabky.dev)

## Browser support

Works in all major browsers except Safari (Swapping favicons dynamically does not work on Safari (see https://stackoverflow.com/a/66099108/)13363739).

Also while it should work on mobile browsers, it less useful there as the browser tab (favicon + title) isn't really visible to user all the time.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Changelog

[View Changelog](/CHANGELOG.md)

### Contact

Created / maintained by Ivan Grginov [@MetarDev](https://twitter.com/MetarDev)

