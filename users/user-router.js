const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('users')
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  users.findById(id)
  .then(users => {
    const user = users[0];
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;
//! resolve to newly create users
  db('users').insert(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});
//! updates
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  users.update(changes,id)
  .then(user => {
    if (user) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});
//! remove 
router.delete('/:id', (req, res) => {
  const { id } = req.params;

 user.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});
router.get('/:id/posts', (req,res) =>{
  const {id} = req.params;
  db('posts as p')
  .join('users as u','u.id', 'p.user_id')
  .select('p.id','p.contents','u.username')
  .where({user_id:id})
  .then(posts =>{
    res.json(posts)
  })
  .catch(err =>{
    res.status(500).json({message:"failed to get posts"})
  });
})

module.exports = router;