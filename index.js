'use strict';

const Queue = require('./queue');

const cats = [
  {
    imageURL:
      'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription:
      'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy1',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:
      'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription:
      'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy2',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:
      'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription:
      'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy3',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  }
];
const dogs = [
  {
    imageURL:
      'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription:
      'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus1',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL:
      'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription:
      'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus2',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL:
      'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription:
      'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus3',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  }
];


const Cats = new Queue();
Cats.enqueue(cats[0]);
Cats.enqueue(cats[1]);
Cats.enqueue(cats[2]);
console.log(Cats.peek());

const Dogs = new Queue();
Dogs.enqueue(dogs[0]);
Dogs.enqueue(dogs[1]);
Dogs.enqueue(dogs[2]);



const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req, res, next) => {
  //peek, so it doesnt modify queue
  res.json(Cats.peek());
});

app.delete('/api/cat', (req, res, next) => {
  //dequeue so it modifies the queue
  const cat = Cats.dequeue();
  Cats.enqueue(cat);
  // cats.shift();
  // console.log(cats);
  res.sendStatus(204);
});

app.get('/api/dog', (req, res, next) => {
  res.json(Dogs.peek());
});

app.delete('/api/dog', (req, res, next) => {
  const dog = Dogs.dequeue();
  Dogs.enqueue(dog);
  res.sendStatus(204);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
