const expect = require('expect.js');
const { fs } = require('memfs');
const handleActions = require('../../lib/actions');
const sinon = require('sinon');
const chalk = require('chalk');

let spy;

describe('Test action: log', function() {
  this.timeout(10000);

  before(function() {
    spy = sinon.spy(console, 'log');
  });

  after(function() {
    spy.restore();
  });

  it('Logs a simple message', async function() {
    const actions = [{
      action: 'log',
      msg: 'a message',
    }];

    await handleActions(actions, fs);

    expect(spy.calledWith('a message')).to.be(true);
  });

  it('Logs a chalky message', async function() {
    const actions = [{
      action: 'log',
      msg: 'a {green message}',
    }];

    await handleActions(actions, fs);

    expect(spy.calledWith(chalk`a {green message}`)).to.be(true);
  });

  it('Logs a message rendered with context from prompt', async function() {
    const actions = [{
      action: 'prompt',
      questions: [{
        type: 'text',
        name: 'answer',
        message: 'Wut',
      }],
      inject: ['nice'],
    }, {
      action: 'log',
      msg: 'a {green {{answer}} message}',
    }];

    await handleActions(actions, fs);

    expect(spy.calledWith(chalk`a {green nice message}`)).to.be(true);
  });
});
