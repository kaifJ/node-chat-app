const path = require('path');
const express = require('express');

app = express();

const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.listen(3000,()=>{
  console.log('Server running on port 3000');
});
