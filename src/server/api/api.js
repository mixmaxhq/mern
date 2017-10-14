const ObjectId = require('mongoist').ObjectId;
const got = require('got');
const db = require('../utils/db');
const MIXMAX_API_KEY = process.env.MIXMAX_API_KEY;

async function list(req, res) {
  // Get a mongo cursor, sort the results by comleted and dueDate and then return the array.
  const results = await db.rows.findAsCursor({}).sort({ completed: 1, dueDate: -1 }).toArray();
  if (!results) return res.status(204).end();

  res.status(200).json({ results });
}

async function create(req, res) {
  const data = req.body;

  const result = await db.rows.insert(data);
  res.status(200).json(result);
}

async function get(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Id is a required parameter.' });

  // When retrieving from mongo by id, you must create an 'ObjectId' from the string for mongo
  // to correctly retrieve the object.
  const result = await db.rows.findOne({ _id: ObjectId(id) });
  if (!result) return res.status(204).end();

  res.status(200).json(result);
}

async function update(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Id is a required parameter.' });

  await db.rows.update({ _id: ObjectId(id) }, { $set: req.body });
  res.status(204).end();
}

async function remove(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Id is a required parameter.' });

  await db.rows.remove({ _id: ObjectId(id) });
  res.status(204).end();
}

async function send(req, res) {
  const to = req.body.to;
  if (!to) return res.status(400).json({ message: 'You must provide a recipient.'});

  const results = await db.rows.find({ completed: false });
  const items = results.map(toWords);
  const message = {
    to: to,
    subject: 'Todo summary - ',
    html: items.join('')
  };

  try {
    await got.post('https://api.mixmax.com/v1/send', {
      body: JSON.stringify({
        message
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-API-Token': MIXMAX_API_KEY
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.statusMessage });
  }

  res.status(204).end();
}

function toWords(item) {
  const { completed, name, dueDate } = item;
  if (completed) return `<p>${name} was completed by ${new Date(dueDate).toDateString()}.</p>`;
  return `<p>${name} is incomplete and due by ${new Date(dueDate).toDateString()}.</p>`;
}

module.exports = {
  list,
  create,
  get,
  update,
  remove,
  send
};
