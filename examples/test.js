const Rasa = require('./../src/index');

let nlu = new Rasa([], 0.8);
nlu.classifier.classify('hello there').then(results => {
  console.log('results', results);
});
