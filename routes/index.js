module.exports = {
  getHomePage: (req, res, next) => {
    let query = "SELECT * FROM `users` ORDER BY id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      res.render("index", {
        title: "开源社成员管理 | 成员列表",
        players: result
      });
    });
  }
};
