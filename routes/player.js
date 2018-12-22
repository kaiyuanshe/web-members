const fs = require('fs');
const kue = require("kue");
const queue = kue.createQueue();


module.exports = {
    addVolunteerPage: (req, res) => {
	res.render('add-player.ejs', {
	    title: "开源社成员管理 | 申请加入开源社",
	    message: '',
	    type: 'volunteer'
	});
    },
    addMemberPage: (req, res) => {
	res.render('add-player.ejs', {
	    title: "开源社成员管理 | 申请加入开源社",
	    message: '申请成为正式成员，需要找到两位开源社正式成员，作为推荐人',
	    type: 'member'
	});
    },
    addPlayer: (req, res) => {
        let name = req.body.name;
        let wechat_id = req.body.wechat_id;
        let nick_name = req.body.nick_name;
	let github_name = req.body.github_name;
	let work_group = req.body.work_group;
	let introduce = req.body.introduce;
	let referee1 = req.body.referee1;
	let referee2 = req.body.referee2;
	db.query("SELECT * FROM wechat_friends WHERE wechat_id='"+wechat_id+"' or nick_name='"+nick_name+"'", (err,result) =>{
	  if(!err){
            if(result.length>0){
              var query = "";
	      wechat_id = result[0].wechat_id;
	      if (referee1 && referee2){
		query = "INSERT INTO `users` (name, wechat_id, nick_name, github_name, referee1, referee2, " + 
		  "work_group, position, introduce, status) VALUES ('" +
		  name+"','"+wechat_id+"','"+nick_name+"','"+github_name+"','"+referee1+"','"+referee2+"','"+
	          work_group+"','预备组员','"+introduce+"','待审核')";
	      } else {
                query = "INSERT INTO `users` (name, wechat_id, nick_name, github_name, " +
		  "work_group, position, introduce, status) VALUES ('" +
	          name+"','"+wechat_id+"','"+nick_name+"','"+github_name+"','"+
	          work_group+"','志愿者','"+introduce+"','待审核')";
	      }
	      console.log(query);
              db.query(query, (err, result) => {
                if (err) {
                  return res.status(500).send(err);						                
		} else {
                  console.log("User Added");
                  queue.create("UserApply", req.body).save();
		}
              });
	    }
	  }
	  res.redirect('/');
	});
    }
};
