const ObjectId = require('mongoist').ObjectId;
const db = require('../utils/db');

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

module.exports = {
  list,
  create,
  get,
  update,
  remove
};
