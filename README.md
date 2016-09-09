# Reesource
A whatwg-fetch convenience wrapper for simple web requests.

If you are new to fetch or whatwg-fetch but would like to make simple web requests to interact with web apis, then `Reesource` will make that task easy for you.

## Installation
`npm install reesource`

## Dependency
The only dependency is on the package `whatwg-fetch`. As it is a polyfill apart from installing it you will have to expose it as a global. You can find these instructions in more detail on the whatwg-fetch github page as well, however they are provided as follows:

1. First add the following to the top of your entry js file such as index.js:
`import 'babel-polyfill';`

2. Then if you are using webpack add the following to your webpack.config.js file's plugins section:
```javascript
plugins:[
	new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	}),
]
```

## Convenience

`Reesource` provides a standard interface for fetch calls:
* The data being passed to any of the method calls can be a standard javascript object; you need not worry about when to pass a query string or an object 
```javascript
{ name: 'John', age: 30 }
```
 the method being called will take care of that.
* You do not have to define the type of call, method names describe the kind of call required:
```javascript
Reesource.getHTML()
Reesource.getJSON()
Reesource.postJSON()
Reesource.postForm()
```
* Return type is converted to required format, otherwise actual result is passed back for further processing.

## Examples
1.
```javascript
var root = 'http://localhost:8080/';
reesource.setGlobalUri(root);

reesource.getJSON('records')
	.then(function (result) {
		//TODO: Do something with the result
	})
	.catch(function (err) {
		console.log(err);
	});
```
2.
```javascript
reesource.postJSON('records',{ data:{ name: 'John', age: 30 } })
	.then(function (result) {
		//TODO: Do something with the result
	})
	.catch(function (err) {
		console.log(err);
	});
```

3.
```javascript
reesource.postJSON('records',{
		authorization: 'Bearer token'	
		data:{ name: 'John', age: 30 } })
	.then(function (result) {
		//TODO: Do something with the result
	})
	.catch(function (err) {
		console.log(err);
	});
```

Feel free to try it out.
