const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findByPosts,
    add,
    update,
    remove
};

function find(){
    return db('users')
}
//! a single user or Null
function findById(id){
    return db('users').where({id}).first();
}
function findByPosts(user_id){
 return db('posts as p')
    .join('users as u','u.id', 'p.user_id')
    .select('p.id','p.contents','u.username')
    .where({user_id:id});
}

function add(user){
return db('users').insert(userData)
  .then(ids =>{
      return  findById(ids[0])
  });
}
function update(change,id){
return db('users').where({ id }).update(changes)
.then(count => {
    return findById(id)
});
}

// resolve to a count
function remove(id){
return db('users').where({ id }).del()
}