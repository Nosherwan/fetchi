# Reesorce
A whatwg-fetch convenience wrapper for simple web requests.

If you are new to fetch or whatwg-fetch but would like to make simple web requests to interact with web apis, then `Reesorce` will make that task easy for you.

## Convenience

`Reesorce` provides a standard interface for fetch calls:
* The data being passed to any of the method calls can be a standard javascript object; you need not worry about when to pass a query string or an object 
```javascript
{ name: 'John', age: 30 }
```
 the method being called will take care of that.
* You do not have to define the type of call, method names describe the kind of call required:
```javascript
Reesorce.getHTML()
Reesorce.getJSON()
Reesorce.postJSON()
Reesorce.postForm()
```
* Return type is converted to required format, otherwise actual result is passed back for further processing.

## Examples
1.
```javascript
var root = 'http://localhost:8080/';
reesorce.setGlobalUri(root);

reesorce.getJSON('records')
	.then(function (result) {
		//TODO: Do something with the result
	})
	.catch(function (err) {
		console.log(err);
	});
```
2.
```javascript
reesorce.postJSON('records',{ data:{ name: 'John', age: 30 } })
	.then(function (result) {
		//TODO: Do something with the result
	})
	.catch(function (err) {
		console.log(err);
	});
```

3.
```javascript
reesorce.postJSON('records',{
		authorization: 'Bearer token'	
		data:{ name: 'John', age: 30 } })
	.then(function (result) {
		//TODO: Do something with the result
	})
	.catch(function (err) {
		console.log(err);
	});
```