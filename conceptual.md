### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Callbacks, Promises and Async/Await

Callbacks: The original approach where you provide a function to execute after the async code finishes. Callbacks can become difficult to follow when multiple calls are made together.

Promises: Introduced as a solution to callback complexities, Promises use the .then() syntax to chain asynchronous operations, making code more readable and manageable.

Async/Await: A recent addition that provides a cleaner and more synchronous-looking syntax. It builds on Promises, allowing you to write asynchronous code that appears sequential, improving code readability.

- What is a Promise?

A promise in JS is an object that represents the eventual completion or failure of an async operation. There are 3 states to promises, pending, fulfilled and rejected. Pending is the first state when a promise is created and the async function is still processing, fulfilled is when the async function is successful meaning the promise is resovled with a value and rejected is the state when the async function encounters an error which stops the promise from being resolved.

- What are the differences between an async function and a regular function?

Async functions return a Promise, while regular functions return a value directly.

Async functions allow asynchronous behavior and can pause execution with the await keyword, while regular functions execute synchronously.

Async functions handle errors using try...catch blocks, whereas regular functions use traditional error handling mechanisms.

Async functions wrap their eventual result in a Promise, whereas regular functions provide the result immediately.

Async functions are commonly used for handling asynchronous operations, offering a cleaner and more organized approach compared to callbacks or manual Promise handling.

- What is the difference between Node.js and Express.js?

Node is the underlying environment that executes JavaScript code on the server-side, while Express is a web application framework built on top of Node.js, providing a faster and more convenient way to build web applications. Express leverages the capabilities of Node.js and enhances them with additional features for web development.

- What is the error-first callback pattern?

The error-first callback pattern is commonly used in Node.js and is used as an argument to an async function. The callback takes 2 parameters, the first is reserved for an erro object and the second parameter is used for the result of the data.

- What is middleware?

Middleware is a function that processes between the HTTP request and the corresponding HTTP response in an application's request-response cycle. Middleware can perform various tasks, but in essence, it is a prerequisite function in the request-response cycle that can stop or allow the cycle to continue based on the data that is passed through it.

- What does the `next` function do?

 The 'next' function is a crucial part of the middleware pattern in frameworks like Express.js. It allows for the sequential execution of middleware functions and provides control flow from one middleware to the next or to error handling middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

Some of the issues with the code are as follows:

Performance: 

The code makes 3 separate API calls instead of making them all concurrently.This would improve speed as the calls would be made in parallel instead of one after another.

Structure: 

The code is written as a single async function that retrieves data from one API. It would be better to separate the API call logic into a separate function which can be reused and tested.

Error handling:

There is no error handling so if the API fail to fetch data the errors will be unhandled and there will be no indication as to why it failed. Instead, it would be best to add try/catch to this code to handle errors.
