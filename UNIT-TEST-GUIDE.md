# Unit Testing Guide
Unit testing follows a pretty common strategy - AAA, or Arrange, Act, Assert. 
First, arrange all preconditions for your test to run. 
Next, Act or execute your code. 
Lastly, assert the correct things happened.

## Using Jest for Client Testing 

### 1. Install Jest using <code>npm</code>:
<code>npm install --save-dev jest</code>

### 2. Given an <code>App.js</code> file:

```
function sum(a, b) {
  return a + b;
  }
module.exports = sum;
```

### 3. Create a test file <code>App.test.js.</code>

```
// Test for PUM03-XYZ.
const sum = require('./sum'); 
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);  // With given input 1 and 2, their sum should be 3. 
  });
```

### 4. Add the following section to your <code>package.json</code> file:
```
{
  "scripts": {
    "test": "jest"
  }
}
```
### 5. Run the test in your terminal using: <code>docker-compose -f docker-compose-test.yml up --build</code> and Jest will print this message:
```
PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (5ms)
```

## Using Jest and Supertest for Server Testing

### 1. Install <code>jest</code> as instructed above. Install Supertest using <code>npm</code>
<code>npm install --save-dev supertest</code>

### 2. Create a test file under <code>server/src/tests</code>

```
imports

// Test for PUM03-XYZ.
describe ..
    it ..
```

### 3. Install Babel using <code>npm</code>. This to ensure that we do not get any parsing errors.
<code>npm install babel-jest @babel/preset-env --save-dev</code>

### 4. Create babel.config.json in server/
```
{
  "presets": ["@babel/preset-env"]
}
```

### 5. Run the test in your terminal using: <code>docker-compose -f docker-compose-test.yml up --build</code>.
