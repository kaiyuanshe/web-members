const fs = require('fs');
const kue = require("kue");
const queue = kue.createQueue();


module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "开源社成员管理 | 申请加入开源社"
            , message: ''
        });
    },
    addPlayer: (req, res) => {
        let name = req.body.name;
        let wechat_id = req.body.wechat_id;
        let nick_name = req.body.nick_name;
        let work_group = req.body.work_group;
        let introduce = req.body.introduce;
        db.query("SELECT * FROM wechat_friends WHERE wechat_id='" + wechat_id + "'", (err, result) => {
            if (!err) {
                if (result.length > 1) {
                    let query = "INSERT INTO `users` (name, wechat_id, nick_name, work_group, position, introduce, status) VALUES ('" +
                        name + "','" + wechat_id + "','" + nick_name + "','" + work_group + "','预备组员','" + introduce + "','待审核')";
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
    }
};
