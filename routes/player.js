const fs = require('fs');
const kue = require("kue");
const queue = kue.createQueue();


module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "开源社成员管理 | 申请加入开源社"
            ,message: ''
        });
    },
    addPlayer: (req, res) => {
        let name = req.body.name;
        let wechat_id = req.body.wechat_id;
        let nick_name = req.body.nick_name;
	let work_group = req.body.work_group;
	let introduce = req.body.introduce;
	db.query("SELECT * FROM wechat_friends WHERE wechat_id='"+wechat_id+"'", (err,result) =>{
	  if(!err){
            if(result.length>1){
              let query = "INSERT INTO `users` (name, wechat_id, nick_name, work_group, position, introduce, status) VALUES ('" +
                  name+"','"+wechat_id+"','"+nick_name+"','"+work_group+"','预备组员','"+introduce+"','待审核')";
              db.query(query, (err, result) => {
                if (err) {
                  return res.status(500).send(err);						                
		}
                console.log("User Added");
                queue.create("UserApply", req.body).save();
                res.redirect('/');
              });
	    }
	  }
	  res.redirect('/');
	});
    },
    editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Player"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`/root/node-mysql-crud-app/public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
