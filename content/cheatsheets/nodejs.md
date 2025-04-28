# Complete Node.js Cheatsheet: Master Backend JavaScript Development

<!-- ADSENSE -->
## Introduction: Why Learn Node.js?

Node.js has revolutionized backend development by bringing JavaScript to the server side, creating a unified language environment for full-stack development. This comprehensive cheatsheet provides essential knowledge for working with Node.js effectively in professional environments and academic settings.

### Why This Cheatsheet Matters:

- **Career Advancement**: Node.js remains one of the most in-demand skills in the job market, with companies from startups to enterprises adopting it for backend services
- **Full-Stack Development**: Learn to leverage JavaScript knowledge across both client and server sides
- **Microservices Architecture**: Node.js excels in building lightweight, scalable microservices
- **Real-Time Applications**: Develop chat applications, collaborative tools, and live dashboards with ease
- **API Development**: Quickly build RESTful or GraphQL APIs with minimal overhead

<!-- ADSENSE -->
## Real-World Use Cases & Benefits

### When to Use Node.js:
- **API Services**: Create fast, scalable APIs that handle JSON data efficiently
- **Real-Time Applications**: Build chat applications, collaborative tools, and live dashboards
- **Single-Page Applications**: Serve and support modern frontend frameworks
- **Streaming Applications**: Process file uploads/downloads or media streaming efficiently
- **Microservices**: Develop lightweight, focused services in distributed architectures
- **DevOps Tooling**: Create custom build scripts, deployment tools, and automation
- **IoT Applications**: Handle numerous concurrent connections from IoT devices

### Main Benefits:
- **Asynchronous & Non-Blocking**: Efficiently handles concurrent operations
- **Fast Execution**: V8 JavaScript engine provides excellent performance
- **NPM Ecosystem**: Access to over 1.3 million packages in the npm registry
- **Same Language**: Use JavaScript across frontend and backend
- **Active Community**: Large community provides support and continuous improvements

<!-- ADSENSE -->
## Node.js Fundamentals

### Core Concepts

#### The Event Loop
```javascript
// Node.js processes events in a single thread using an event loop
// This example demonstrates the event execution order

console.log('1. This runs first');

setTimeout(() => {
  console.log('4. This runs fourth (after timeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. This runs third (microtask)');
});

console.log('2. This runs second');

// Output order:
// 1. This runs first
// 2. This runs second
// 3. This runs third (microtask)
// 4. This runs fourth (after timeout)
```

#### Common Global Objects
```javascript
// __dirname: Directory name of the current module
console.log(__dirname);  // /path/to/current/directory

// __filename: File name of the current module
console.log(__filename); // /path/to/current/directory/file.js

// process: Information about the current Node.js process
console.log(process.env.NODE_ENV); // Access environment variables
console.log(process.argv);         // Command line arguments
console.log(process.cwd());        // Current working directory

// Buffer: For handling binary data
const buf = Buffer.from('Hello, world!');
console.log(buf.toString()); // 'Hello, world!'
```

### Module Systems

#### CommonJS (Traditional)
```javascript
// Exporting in module.js
module.exports = {
  sayHello: function() {
    return 'Hello, world!';
  }
};

// Or export individual items
exports.sayHello = function() {
  return 'Hello, world!';
}; 
// Note: Don't use both patterns in the same file

// Importing
const myModule = require('./module');
console.log(myModule.sayHello()); // 'Hello, world!'
```

#### ES Modules (Modern)
```javascript
// In package.json: { "type": "module" }

// Exporting in module.js
export function sayHello() {
  return 'Hello, world!';
}

export const PI = 3.14159;

// Default export
export default function() {
  return 'I am the default';
}

// Importing
import { sayHello, PI } from './module.js';
import defaultFunction from './module.js';
import * as allExports from './module.js';

console.log(sayHello());        // 'Hello, world!'
console.log(PI);                // 3.14159
console.log(defaultFunction()); // 'I am the default'
console.log(allExports.PI);     // 3.14159
```

<!-- ADSENSE -->
## Core Modules & APIs

### File System (`fs`)

#### Reading & Writing Files
```javascript
const fs = require('fs');

// Synchronous operations (blocking)
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
  
  fs.writeFileSync('output.txt', 'Hello, world!');
} catch (err) {
  console.error(err);
}

// Asynchronous operations (non-blocking) with callbacks
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

fs.writeFile('output.txt', 'Hello, world!', (err) => {
  if (err) console.error(err);
});

// Using promises (Node.js 10+)
const fsPromises = require('fs').promises;

async function processFiles() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
    
    await fsPromises.writeFile('output.txt', 'Hello, world!');
  } catch (err) {
    console.error(err);
  }
}

processFiles();
```

#### Working with Directories
```javascript
const fs = require('fs');
const path = require('path');

// Create directory
fs.mkdir('newDir', (err) => {
  if (err) console.error(err);
});

// Read directory contents
fs.readdir('.', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  
  files.forEach(file => {
    console.log(file);
  });
});

// Check if file or directory exists
fs.access('file.txt', fs.constants.F_OK, (err) => {
  console.log(err ? 'File does not exist' : 'File exists');
});

// Get file info
fs.stat('file.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  
  console.log(`Is file: ${stats.isFile()}`);
  console.log(`Is directory: ${stats.isDirectory()}`);
  console.log(`File size: ${stats.size} bytes`);
  console.log(`Last modified: ${stats.mtime}`);
});
```

### Path Module
```javascript
const path = require('path');

// Join path segments
const fullPath = path.join(__dirname, 'subfolder', 'file.txt');
console.log(fullPath); // /path/to/current/directory/subfolder/file.txt

// Resolve to absolute path
const absolutePath = path.resolve('file.txt');
console.log(absolutePath); // /path/to/current/working/directory/file.txt

// Parse path
const pathInfo = path.parse('/home/user/file.txt');
console.log(pathInfo);
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Get filename extension
console.log(path.extname('file.txt')); // .txt

// Normalize path (resolve '..' and '.')
console.log(path.normalize('/home/user/../file.txt')); // /home/file.txt
```

### HTTP Module
```javascript
const http = require('http');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Request information
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, req.headers);
  
  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  
  // Handle different routes
  if (req.url === '/') {
    res.end(JSON.stringify({ message: 'Home page' }));
  } else if (req.url === '/api/users') {
    res.end(JSON.stringify({ users: ['John', 'Jane', 'Bob'] }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Make HTTP request
http.get('http://example.com', (res) => {
  let data = '';
  
  // Receive data in chunks
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  // Process complete response
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
```

### Events Module
```javascript
const EventEmitter = require('events');

// Create custom event emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Register event listener
myEmitter.on('event', (arg1, arg2) => {
  console.log('Event occurred!', arg1, arg2);
});

// Register one-time listener
myEmitter.once('oneTimeEvent', () => {
  console.log('This will fire only once');
});

// Emit events
myEmitter.emit('event', 'arg1Value', 'arg2Value');
myEmitter.emit('oneTimeEvent'); // Fires
myEmitter.emit('oneTimeEvent'); // Does nothing

// Remove specific listener
function listener() {
  console.log('Listening...');
}
myEmitter.on('removeMe', listener);
myEmitter.removeListener('removeMe', listener);

// Remove all listeners for an event
myEmitter.removeAllListeners('event');
```

### Stream Module
```javascript
const fs = require('fs');

// Create readable stream
const readStream = fs.createReadStream('input.txt', { 
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

// Create writable stream
const writeStream = fs.createWriteStream('output.txt');

// Handle stream events
readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data`);
});

readStream.on('end', () => {
  console.log('Finished reading');
});

readStream.on('error', (err) => {
  console.error('Error while reading:', err);
});

// Pipe data from readable to writable stream
readStream.pipe(writeStream);

// Transform stream example
const { Transform } = require('stream');

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const uppercaseTransform = new UppercaseTransform();
readStream.pipe(uppercaseTransform).pipe(writeStream);
```

<!-- ADSENSE -->
## NPM & Package Management

### Package.json Configuration
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint ."
  },
  "keywords": ["node", "example"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.12"
  },
  "devDependencies": {
    "jest": "^27.3.1",
    "nodemon": "^2.0.14",
    "eslint": "^8.1.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Common NPM Commands
```bash
# Initialize a new project
npm init
npm init -y  # Skip questions, use defaults

# Install packages
npm install express  # Install to dependencies
npm install --save-dev jest  # Install to devDependencies
npm install -g nodemon  # Install globally
npm install express@4.17.1  # Install specific version

# Uninstall packages
npm uninstall express

# Update packages
npm update
npm update express

# Run scripts
npm start
npm test
npm run dev

# Manage packages
npm list  # List installed packages
npm list --depth=0  # List top-level packages only
npm outdated  # Check for outdated packages
npm audit  # Check for vulnerabilities

# Publish packages
npm login
npm publish
```

<!-- ADSENSE -->
## Express.js Framework

### Basic Setup
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Basic routing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: 'Data received' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Route Parameters & Query Strings
```javascript
// Route parameters
app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id); // Access route parameter
  res.json({ userId: req.params.id });
});

// Multiple parameters
app.get('/api/posts/:year/:month', (req, res) => {
  const { year, month } = req.params;
  res.json({ year, month });
});

// Query parameters
app.get('/api/products', (req, res) => {
  const { category, sort } = req.query;
  console.log(`Category: ${category}, Sort: ${sort}`);
  res.json({ category, sort });
});
```

### Middleware
```javascript
// Custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to the next middleware
}

// Apply middleware to all routes
app.use(logger);

// Apply middleware to specific route
app.get('/api/protected', logger, (req, res) => {
  res.send('Protected route');
});

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Route not found middleware
app.use((req, res) => {
  res.status(404).send('Route not found');
});
```

### Routers & Route Organization
```javascript
// user-routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create user' });
});

module.exports = router;

// index.js
const userRoutes = require('./routes/user-routes');
app.use('/api/users', userRoutes);
```

<!-- ADSENSE -->
## Asynchronous Patterns

### Callback Pattern
```javascript
function fetchData(callback) {
  setTimeout(() => {
    try {
      const data = { name: 'John', age: 30 };
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  }, 1000);
}

fetchData((err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Data:', data);
});
```

### Promises
```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = { name: 'John', age: 30 };
        resolve(data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log('Data:', data);
    return processData(data);
  })
  .then(processedData => {
    console.log('Processed:', processedData);
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    console.log('Operation complete');
  });

// Promise combinators
Promise.all([fetchUsers(), fetchPosts(), fetchComments()])
  .then(([users, posts, comments]) => {
    // All promises resolved
  })
  .catch(err => {
    // Any promise rejected
  });

Promise.race([fetchFast(), fetchSlow()])
  .then(result => {
    // First promise to resolve
  });

Promise.allSettled([fetchUsers(), fetchPosts()])
  .then(results => {
    // Results array contains status and value/reason for each promise
  });
```

### Async/Await
```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log('Data:', data);
    
    const processedData = await processData(data);
    console.log('Processed:', processedData);
    
    return processedData;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  } finally {
    console.log('Operation complete');
  }
}

// Execute async function
getData()
  .then(result => console.log('Result:', result))
  .catch(err => console.error('Caught:', err));

// Parallel execution with async/await
async function getMultipleData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchComments()
    ]);
    
    console.log(users, posts, comments);
  } catch (err) {
    console.error(err);
  }
}
```

<!-- ADSENSE -->
## Database Integration

### MongoDB with Mongoose
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  createdAt: { type: Date, default: Date.now }
});

// Add methods to schema
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Create static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// Create model
const User = mongoose.model('User', userSchema);

// Create document
async function createUser() {
  try {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    });
    
    const savedUser = await user.save();
    console.log('User created:', savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
  }
}

// Find documents
async function findUsers() {
  try {
    // Find all users
    const allUsers = await User.find();
    
    // Find with filters
    const youngUsers = await User.find({ age: { $lt: 30 } });
    
    // Find one document
    const john = await User.findOne({ name: 'John Doe' });
    
    // Find by ID
    const user = await User.findById('60a1f23c5e8d3c2f8c9d1e5a');
    
    // Using static method
    const userByEmail = await User.findByEmail('john@example.com');
    
    return { allUsers, youngUsers, john, user, userByEmail };
  } catch (err) {
    console.error('Error finding users:', err);
    throw err;
  }
}

// Update documents
async function updateUser(id) {
  try {
    // Update one document
    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { age: 26 } }
    );
    
    // Find and update
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name: 'John Smith' } },
      { new: true } // Return the updated document
    );
    
    return user;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

// Delete documents
async function deleteUser(id) {
  try {
    // Delete one document
    const result = await User.deleteOne({ _id: id });
    
    // Find and delete
    const deletedUser = await User.findByIdAndDelete(id);
    
    return { result, deletedUser };
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}
```

### SQL with Sequelize
```javascript
const { Sequelize, DataTypes } = require('sequelize');

// Connect to database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'sqlite', 'mssql'
});

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully');
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
}

// Define model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 18
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create related model
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  }
});

// Define relationships
User.hasMany(Post);
Post.belongsTo(User);

// Sync models with database
async function syncModels() {
  try {
    await sequelize.sync({ force: true }); // Recreates tables
    console.log('Models synchronized with database');
  } catch (err) {
    console.error('Error syncing models:', err);
  }
}

// CRUD operations
async function userOperations() {
  try {
    // Create
    const user = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 28
    });
    
    // Create related record
    const post = await Post.create({
      title: 'My First Post',
      content: 'Hello, world!',
      UserId: user.id
    });
    
    // Read
    const allUsers = await User.findAll();
    const userById = await User.findByPk(1);
    const userWithPosts = await User.findOne({
      where: { email: 'jane@example.com' },
      include: Post
    });
    
    // Update
    await user.update({ age: 29 });
    
    // Delete
    await post.destroy();
    await user.destroy();
    
    return { user, post, allUsers, userById, userWithPosts };
  } catch (err) {
    console.error('Error in user operations:', err);
    throw err;
  }
}
```

<!-- ADSENSE -->
## Authentication & Security

### JWT Authentication
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// In-memory user store (use a database in production)
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };
    
    users.push(user);
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(u => u.username === username);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Authentication middleware
function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1]; // 'Bearer TOKEN'
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

// Protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ 
    message: 'Protected data', 
    user: req.user 
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Security Best Practices
```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// Set security headers
app.use(helmet());

// Configure CORS
app.use(cors({
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

app.use('/api', apiLimiter);

// Validate input
app.post('/api/data', (req, res) => {
  const { username } = req.body;
  
  // Validate input
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Invalid username' });
  }
  
  if (username.length < 3 || username.length > 30) {
    return res.status(400).json({ message: 'Username must be between 3 and 30 characters' });
  }
  
  // Process valid input
  res.json({ message: 'Valid data' });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Don't expose error details in production
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ message: 'Internal Server Error' });
  } else {
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

<!-- ADSENSE -->
## Testing in Node.js

### Unit Testing with Jest
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// math.test.js
const { add, subtract } = require('./math');

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
  });
  
  test('add handles string inputs', () => {
    expect(add('1', '2')).toBe('12'); // String concatenation
  });
});

// Async testing
const fetchData = () => Promise.resolve('data');

test('fetchData returns data', async () => {
  const data = await fetchData();
  expect(data).toBe('data');
});

// Mocking
jest.mock('./database', () => ({
  getUser: jest.fn(() => ({ id: 1, name: 'Test User' }))
}));

const { getUser } = require('./database');

test('getUser returns user data', () => {
  const user = getUser(1);
  expect(user).toEqual({ id: 1, name: 'Test User' });
  expect(getUser).toHaveBeenCalledWith(1);
});
```

### API Testing with Supertest
```javascript
const request = require('supertest');
const express = require('express');

// App setup
const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.status(201).json({ id: 3, name });
});

// Tests
describe('User API', () => {
  test('GET /api/users returns users', async () => {
    const response = await request(app).get('/api/users');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
  
  test('POST /api/users creates a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Bob' })
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 3, name: 'Bob' });
  });
  
  test('POST /api/users validates input', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({})
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
```

### Test Coverage
```bash
# Add test coverage to package.json
# "scripts": {
#   "test": "jest",
#   "test:coverage": "jest --coverage"
# }

# Run coverage report
npm run test:coverage
```

<!-- ADSENSE -->
## Performance Optimization

### Profiling & Debugging
```javascript
// Measure execution time
console.time('operation');
// Code to measure
console.timeEnd('operation');

// CPU profiling
const { performance } = require('perf_hooks');

function measurePerformance(fn, iterations = 1000) {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  
  const end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
}

// Memory usage
const memoryUsage = process.memoryUsage();
console.log(`Heap total: ${memoryUsage.heapTotal / 1024 / 1024} MB`);
console.log(`Heap used: ${memoryUsage.heapUsed / 1024 / 1024} MB`);

// Debugging with --inspect
// Run: node --inspect app.js
// Then open Chrome and navigate to chrome://inspect
```

### Caching Strategies
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Function with caching
async function getUserById(id) {
  // Check cache first
  const cacheKey = `user:${id}`;
  const cachedUser = cache.get(cacheKey);
  
  if (cachedUser) {
    console.log('Cache hit');
    return cachedUser;
  }
  
  console.log('Cache miss');
  // Fetch from database
  const user = await database.findUserById(id);
  
  // Save to cache
  cache.set(cacheKey, user);
  
  return user;
}

// Cache middleware for Express
function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl}` || req.url;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      res.send(cachedResponse);
      return;
    }
    
    // Store original send method
    const originalSend = res.send;
    
    // Override send method
    res.send = function(body) {
      cache.set(key, body, duration);
      originalSend.call(this, body);
    };
    
    next();
  };
}

// Use in Express route
app.get('/api/products', cacheMiddleware(300), (req, res) => {
  // Expensive operation
  res.json({ products: [...] });
});
```

### Worker Threads
```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// Main thread
if (isMainThread) {
  // Create worker
  const worker = new Worker(__filename, {
    workerData: { input: [1, 2, 3, 4, 5] }
  });
  
  // Handle messages from worker
  worker.on('message', (result) => {
    console.log('Result from worker:', result);
  });
  
  // Handle errors
  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });
  
  // Handle worker exit
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
  
  // Send message to worker
  worker.postMessage({ cmd: 'start' });
} else {
  // Worker thread
  const { input } = workerData;
  
  // Process data
  function processData(data) {
    return data.map(x => x * 2);
  }
  
  // Handle messages from main thread
  parentPort.on('message', (message) => {
    if (message.cmd === 'start') {
      const result = processData(input);
      parentPort.postMessage(result);
    }
  });
}
```

### Clustering
```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Handle worker exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace dead worker
    cluster.fork();
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  }).listen(8000);
  
  console.log(`Worker ${process.pid} started`);
}
```

<!-- ADSENSE -->
## Deployment & DevOps

### Environment Variables
```javascript
// Load environment variables from .env file
require('dotenv').config();

// Access environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URL = process.env.DB_URL;

// Environment-specific configuration
if (NODE_ENV === 'production') {
  // Production-specific settings
} else if (NODE_ENV === 'test') {
  // Test-specific settings
} else {
  // Development settings
}

// Best practices
// .env file (not in version control)
// PORT=3000
// DB_URL=mongodb://localhost:27017/myapp
// JWT_SECRET=your_secret_key

// .env.example file (in version control)
// PORT=
// DB_URL=
// JWT_SECRET=
```

### Process Management with PM2
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start app.js --name "my-app"

# Start with specific configuration
pm2 start app.js --name "my-app" --watch --max-memory-restart 500M

# Cluster mode
pm2 start app.js -i max  # Use all available CPUs
pm2 start app.js -i 4    # Use 4 instances

# Process management
pm2 list                 # List all processes
pm2 show my-app          # Show detailed information
pm2 stop my-app          # Stop application
pm2 restart my-app       # Restart application
pm2 delete my-app        # Remove application
pm2 logs                 # Display logs
pm2 monit                # Monitoring dashboard

# PM2 ecosystem file (ecosystem.config.js)
module.exports = {
  apps: [{
    name: 'api',
    script: 'app.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8000
    }
  }]
};

# Start with ecosystem file
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
```

### Docker Integration
```dockerfile
# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "app.js"]
```

```bash
# Build Docker image
docker build -t my-node-app .

# Run Docker container
docker run -p 3000:3000 -d my-node-app

# Docker Compose (docker-compose.yml)
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_URL=mongodb://mongo:27017/myapp
    depends_on:
      - mongo
  mongo:
    image: mongo
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
volumes:
  mongo-data:
```

<!-- ADSENSE -->
## Advanced Concepts

### WebSockets with Socket.io
```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Send message to client
  socket.emit('welcome', { message: 'Welcome to the chat!' });
  
  // Broadcast to all clients except sender
  socket.broadcast.emit('userJoined', { userId: socket.id });
  
  // Handle messages from client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    
    // Send to all clients including sender
    io.emit('message', {
      userId: socket.id,
      text: data.text,
      timestamp: new Date()
    });
  });
  
  // Join room
  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.to(room).emit('userJoined', { userId: socket.id });
  });
  
  // Send to specific room
  socket.on('roomMessage', (data) => {
    io.to(data.room).emit('message', {
      userId: socket.id,
      text: data.text,
      room: data.room
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    io.emit('userLeft', { userId: socket.id });
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### GraphQL with Apollo Server
```javascript
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Schema definition
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
`;

// Sample data
const users = [
  { id: '1', name: 'John', email: 'john@example.com' }
];

const posts = [
  { id: '1', title: 'Hello World', content: 'First post content', authorId: '1' }
];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    posts: () => posts,
    post: (_, { id }) => posts.find(post => post.id === id)
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const id = String(users.length + 1);
      const user = { id, name, email };
      users.push(user);
      return user;
    },
    createPost: (_, { title, content, authorId }) => {
      const id = String(posts.length + 1);
      const post = { id, title, content, authorId };
      posts.push(post);
      return post;
    }
  },
  User: {
    posts: (user) => posts.filter(post => post.authorId === user.id)
  },
  Post: {
    author: (post) => users.find(user => user.id === post.authorId)
  }
};

// Create Apollo Server
async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  
  await server.start();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startApolloServer();
```

### Microservices Communication
```javascript
// Service A (user-service.js)
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// User database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

app.listen(3001, () => {
  console.log('User service running on port 3001');
});

// Service B (post-service.js)
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Post database
const posts = [
  { id: 1, title: 'First Post', content: 'Hello world', userId: 1 }
];

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get post with author information
app.get('/posts/:id', async (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  try {
    // Get author from user service
    const userResponse = await axios.get(`http://localhost:3001/users/${post.userId}`);
    const author = userResponse.data;
    
    res.json({
      ...post,
      author
    });
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.json(post); // Return without author info
  }
});

app.listen(3002, () => {
  console.log('Post service running on port 3002');
});

// API Gateway (gateway.js)
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy requests to user service
app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:3001',
  pathRewrite: { '^/api/users': '/users' },
  changeOrigin: true
}));

// Proxy requests to post service
app.use('/api/posts', createProxyMiddleware({
  target: 'http://localhost:3002',
  pathRewrite: { '^/api/posts': '/posts' },
  changeOrigin: true
}));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
```

<!-- ADSENSE -->
## Interview Preparation Tips

### Common Node.js Interview Questions

1. **"What is Node.js and how does it work?"**
   - Node.js is a JavaScript runtime built on Chrome's V8 engine
   - It uses an event-driven, non-blocking I/O model
   - Single-threaded event loop handles asynchronous operations
   - Uses callback queue and event loop to handle concurrent operations

2. **"Explain the Event Loop in Node.js"**
   - Main component that processes asynchronous operations
   - Phases: timers, pending callbacks, idle/prepare, poll, check, close callbacks
   - Executes callbacks in order: microtasks (Promises) → timers → I/O → setImmediate

3. **"What is middleware in Express?"**
   - Functions that have access to request, response objects and next function
   - Used for: authentication, logging, parsing request bodies, error handling
   - Executed in the order they are added to the application

4. **"Explain the difference between `process.nextTick()` and `setImmediate()`"**
   - `process.nextTick()`: Callbacks execute before the next phase of the event loop
   - `setImmediate()`: Callbacks execute in the check phase after I/O operations

5. **"How do you handle errors in Node.js?"**
   - Try/catch blocks for synchronous code
   - Error-first callbacks for callback-based asynchronous code
   - Promise catch blocks or try/catch with async/await
   - Error events for EventEmitters
   - Global error handlers for uncaught exceptions

6. **"What is the purpose of package-lock.json?"**
   - Locks dependency versions for consistent installations
   - Records exact version of each package in the dependency tree
   - Ensures same packages are installed regardless of semver rules

7. **"What are streams in Node.js and when would you use them?"**
   - Objects for handling streaming data
   - Types: Readable, Writable, Duplex, Transform
   - Use cases: File operations, HTTP requests/responses, data processing
   - Benefits: Memory efficiency, time efficiency, composability

8. **"How would you debug a Node.js application?"**
   - Console.log statements
   - Node.js debugger with `--inspect` flag
   - VS Code debugger
   - Node.js profiler
   - APM tools like New Relic or Datadog

### Code Examples to Practice

1. **Write a function that reads a file asynchronously**
```javascript
// Using callbacks
function readFileCallback(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

// Using promises
function readFilePromise(path) {
  return fs.promises.readFile(path, 'utf8');
}

// Using async/await
async function readFileAsync(path) {
  try {
    const data = await fs.promises.readFile(path, 'utf8');
    return data;
  } catch (err) {
    throw err;
  }
}
```

2. **Create a simple HTTP server**
```javascript
const http = require('http');

function createServer(port = 3000) {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });
  
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  
  return server;
}

createServer();
```

3. **Implement a basic Express middleware**
```javascript
function requestLogger(req, res, next) {
  const start = Date.now();
  
  // Once the response is finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

// Usage
app.use(requestLogger);
```

<!-- ADSENSE -->
## Resources for Further Learning

- **Documentation**:
  - [Node.js Official Docs](https://nodejs.org/en/docs/)
  - [Express.js Documentation](https://expressjs.com/)
  - [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/current/)
  - [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
  
- **Books**:
  - "Node.js Design Patterns" by Mario Casciaro and Luciano Mammino
  - "Node.js Web Development" by David Herron
  - "Node.js in Practice" by Alex Young and Marc Harter
  
- **Courses and Tutorials**:
  - freeCodeCamp's API and Microservice Certification
  - Node.js courses on Udemy, Pluralsight, and egghead.io
  - The Complete Node.js Developer Course on Udemy

- **Tools**:
  - Postman for API testing
  - VS Code with Node.js debugging
  - PM2 for process management
  - Docker for containerization
  - Jest and Mocha for testing

---

*This cheatsheet is optimized for both learning and reference. Keep it handy during development and interviews to quickly access Node.js concepts and patterns.*