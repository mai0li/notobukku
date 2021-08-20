const express = require('express');
const app = express();
import { getNotebookList } from './pup'
// const notebookList = getNotebookList();

app.get('/', function(req,res){
  res.send("Out here");
});

app.get('/notebooks', (req, res) => {
    return res.status(200).send({
        success: 'true',
        message: 'notebooks'
        // notebooks: notebookList
    })
})

const port = 3000;
app.listen(port, function () {
  console.log('Listening on port 3000!')
})