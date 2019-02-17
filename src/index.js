const fetch = require('node-fetch');


module.exports = class Rasa
{
  constructor(intents = [], score, opts = {})
  {
    // Load intents into rasa files
    this.score = score;
    this.settings = {...this.defaults, ...opts};
  }

  get defaults()
  {
    return {
      host: 'localhost',
      port: 5000
    };
  }

  get endpoint()
  {
    let {host, port} = this.settings;
    return `http://${host}:${port}/parse`;
  }

  get classifier()
  {
    return new RasaClassifier('current', 'nlu', this.endpoint);
  }
};

class RasaClassifier
{
  constructor(project, model, api)
  {
    this.project = project;
    this.model = model;
    this.api = api;
  }

  classify(q)
  {
    let {project, model} = this;
    let body = {q, model, project};

    return fetch(this.api, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(kb => {
        return {
          intentName: kb.intent.name
        };
      });
  }
}
