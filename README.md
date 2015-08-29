# jsdom-test

This is a simple CLI wrapper around jsdom. It runs the html file you feed it. This file should run your unit tests. If one or more tests fail, it will stop with exit code `1`.

To be able to know when your tests are finished, you should create a callback `window.onMochaTestFinish`. It accepts one parameter; the failed test count.

Here is an example of this in Mocha:

```js
var failedCount = 0;

afterEach(function() {
    if (this.currentTest.state === 'failed') {
        failedCount++;
    }
});

afterAll(function(done) {
    if (_.isFunction(window.onMochaTestFinish)) {
        window.onMochaTestFinish(failedCount);
    }
    done();
});
```

## Usage

```
jsdom-test dist/test.html
```
