const express = require('express')
const app = express();
const PORT = 3001;

let phoneBook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req,res)=>{
    res.send('<h1>Hello World</h1>')
})

app.get('/phonebook', (req,res)=>{
    res.send(phoneBook);
})

app.get('/phonebook/person/:id', (req,res)=>{
    const id = req.params.id;
    const person = phoneBook.find(entry => entry.id == id);
    if (person){
        res.send(person);
    } else{
        res.status(404).end();
    }
})

app.get('/info', (req,res)=>{
    const date = new Date();
    const info = `Phonebook has info for ${phoneBook.length} people <br> ${date}`;
    res.send(info);

})

app.delete('/phonebook/person/:id', (req,res)=>{
    const id = req.params.id;
    const person = phoneBook.filter(entry => entry.id !== id)

    res.status(204).end();
})

const generateID = () =>{
    const maxId = phoneBook.length > 0 ?
        Math.max(...phoneBook.map(entry => entry.id)) : 0;
    
    return maxId + 1; 
}

app.post('/phonebook/person', (req,res)=>{
    const body = req.body;

    if (!body.content){
        return res.status(404).json({
            error: 'content is missing'
        })
    } else if (!body.name){
        return res.status(404).json({
            error: 'Name is missing'
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateID(),
        name: '',
        number: '',
    }
   
    phoneBook = phoneBook.concat(person);
})

app.listen(PORT, ()=>{
    console.log(`Success: Listening on PORT ${PORT}`);
})