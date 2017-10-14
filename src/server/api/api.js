const mongoist = require('mongoist');
const db = require('../utils/db');

async function list(req, res) {
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

  const result = await findOneById(id);
  if (!result) return res.status(204).end();

  res.status(200).json(result);
}

async function update(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Id is a required parameter.' });

  await db.rows.update({
    _id: mongoist.ObjectId(id)
  }, {
    $set: req.body
  });

  res.status(204).end();
}

async function remove(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Id is a required parameter.' });

  await db.rows.remove({ _id: id });
  res.status(204).end();
}

function findOneById(_id) {
  return db.rows.findOne({ _id: mongoist.ObjectId(_id) });
}

module.exports = {
  list,
  create,
  get,
  update,
  remove
};
