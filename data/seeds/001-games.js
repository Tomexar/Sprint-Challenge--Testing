
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {name: 'Pacman', genre: "Arcade", release_year:1980}
      ]);
    });
};
