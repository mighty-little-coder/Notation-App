const express = require('express');
const app = express();
const PORT = process.env.PORT || 3007;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Use routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT} 📝`);
});