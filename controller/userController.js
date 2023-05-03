const { Sequelize, users, post_tags, tags } = require("../models");
const { Op, Model } = require("sequelize");
const Users = Model.users;
const Posts = Model.posts;

var bulk = async (req, res) => {
    try {
      //  bulkcreate
      let bulkdata = await Users.bulkCreate([
        { name: "hetal", email: "hetal@gmail.com", mobile: "6547412580" },
        { name: "dhyani", email: "dhyani@gmail.com", mobile: "963258741" },
        { name: "madhuri", email: "madhuri@gmail.com", mobile: "123987563" },
      ]);
      let response = {
        success: true,
        data: "ok",
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };

  var crudoperation = async (req, res) => {
    // // insert
    let data = await Users.create({ name: "abc", email: "krupali@gmail.com" });
    // update
    let updatedata = await Users.update(
      { name: "krupali", email: "bhutkrupali@gmail.com" },
      {
        where: {
          id: 2,
        },
      }
    );
    // delete
    let deletedata = await Users.destroy({ where: { id: 3 } });
    // truncate
    let truncatedata = await Users.destroy({ truncate: true });
    //  bulkcreate
    let bulkdata = await Users.bulkCreate([
      { name: "hetal", email: "hetal@gmail.com", mobile: "9725621749" },
      { name: "dhyani", email: "dhyani@gmail.com", mobile: "9532620517" },
      { name: "madhuri", email: "madhuri@gmail.com", mobile: "9128164296" },
    ]);
    // select
    let selectdata = await Users.findAll({
      attributes: ["name"],
    });
    let response = {
      data: selectdata,
    };
    res.status(200).json(response);
  };

  var ope = async (req, res) => {
    let datasel = await Users.findAll({
      attributes: [
        [Sequelize.fn("CONCAT", Sequelize.col("email"), "heya"), "emailcount"],
      ],
    });
    let datasel2 = await Users.findAll({
      attributes: {
        include: [
          [Sequelize.fn("CONCAT", Sequelize.col("email"), "heya"), "emailcount"],
        ],
      },
    });
    let response = {
      data: datasel,
    };
    res.status(200).json(response);
  };

  var onetomany = async (req, res) => {
    let { id, name, email } = req.body;
    console.log(id);
    try {
      let onetomanydata = await Users.findAll({
        attributes: ["name", "email"],
        include: [
          {
            model: Posts,
            attributes: ["name", "title", "content"],
          },
        ],
        where: {
          [Op.or]: {
            id: [id],
            name: [name],
            email: [email],
            // [Op.and]: [{ name:name }, { email:email}],
          },
        },
      });
      let response = {
        data: onetomanydata,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var Insertasso = async (req, res) => {
    try {
      let { name, email, title, contact } = req.body;
      let datainsert = await Users.create({
        name: name,
        email: email,
      });
      console.log(datainsert);
      if (datainsert && datainsert.dataValues.id) {
        await Posts.create({
          name: name,
          title: title,
          contact: contact,
          UserId: datainsert.dataValues.id,
        });
      }
      let response = {
        success: true,
        data: datainsert,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var Updateasso = async (req, res) => {
    try {
      let { id, name, email, title, content } = req.body;
      let Posts = req.body.post;
      let updatedata = await Users.update(
        { name: name, email: email },
        {
          where: {
            id: id,
          },
          include: [{ model: Posts }],
        }
      );
      if (updatedata) {
        await Posts.update(
          {
            name: name,
            title: title,
            content: content,
          },
          {
            where: {
              UidserId: id,
            },
          }
        );
      }
      let response = {
        success: true,
        data: updatedata,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var onetomany2 = async (req, res) => {
    let { id, name, email } = req.body;
    try {
      let onetomanydata2 = await Employee.findAll({
        attributes: ["name", "email"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
        where: {
          [Op.or]: {
            name: [name],
            email: [email],
            // [Op.and]: [{ name:name }, { email:email}],
          },
        },
      });
      let response = {
        success: true,
        data: onetomanydata2,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };

  var practice = async (req, res) => {
    let { id, name, email } = req.body;
    try {
      let onetomanydata = await Users.findAll({
        attributes: ["name", "email"],
        include: [
          {
            model: Employee,
            attributes: ["name", "userId", "email"],
          },
        ],
        where: {
          [Op.and]: {
            name: [name],
            email: [email],
            // [Op.and]: [{ name:name }, { email:email}],
          },
        },
      });
      let response = {
        data: onetomanydata,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var practice2 = async (req, res) => {
    let { id, name, email, course_name } = req.body;
    try {
      let onetomanydata = await Users.findAll({
        attributes: ["name", "email"],
        include: [
          {
            model: Employee,
            attributes: ["name", "userId", "email"],
          },
        ],
        where: {
          [Op.or]: {
            name: {
              [Op.or]: {
                [Op.like]: `%${name}%`,
              },
            },
            [Op.and]: {
              email: [email],
              course_name: [course_name],

            },
          },
        },
      });
      let response = {
        data: onetomanydata,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var searchpag = async (req, res) => {
    const { name, email } = req.body;
    let page = req.query.page;
    let sort = req.query.sort || "ASC";
    var limit = 7;
    var offset = (page - 1) * limit;
    let pagedata = await Users.findAll({
      where: {
        [Op.and]: {
          name: {
            [Op.like]: `%${name}%`,
          },
          email: {
            [Op.like]: `%${email}%`,
          },
        },
      },
      offset: offset,
      limit: limit,
      order: [["id", `${sort}`]],
    });
    let response = {
      success: true,
      data: pagedata,
    };
    res.status(200).json(response);
  };
  var softdelete = async (req, res) => {
    try {
      let { id } = req.body;
      let sd = await Users.destroy({
        where: {
          id: id,
        },
      });
      // let restore = await Users.restore({where:{id:10}})
      let sdelete = await Users.findAll({});
      let response = {
        success: true,
        data: sdelete,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var restore = async (req, res) => {
    try {
      let { id } = req.body;
      let restore = await Users.restore({ where: { id: id } });
      let sdelete = await Users.findAll({});
      let response = {
        success: true,
        data: sdelete,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var manytomanyjun = async (req, res) => {
    let { name, email, title, content, postId, tagId } = req.body;
  
    let datainsertmany = await Users.create({
      name: name,
      email: email,
    });
    if (datainsertmany && datainsertmany.dataValues.id) {
      await Posts.create({
        name: name,
        title: title,
        content: content,
        UserId: datainsertmany.dataValues.id,
      });
    }
    console.log("datainsertmany", datainsertmany.id);
  
    if (datainsertmany && datainsertmany.dataValues.id) {
      await Tags.create({
        name: name,
      });
    }
    console.log("datainsertmanytag", datainsertmany.id);
    if (datainsertmany && datainsertmany.dataValues.id) {
      await Post_tag.create({
        PostId: datainsertmany.dataValues.id,
        tagId: tagId,
      });
    }
  
    let response = {
      success: true,
      data: datainsertmany,
    };
    res.status(200).json(response);
  };
  var manytomanyjunselect = async (req, res) => {
    try {
      let { id, name, email, title, content, tagId, postId } = req.body;
      let onetomanydata = await Posts.findAll({
        attributes: ["name", "title", "content"],
  
        include: [
          {
            model: Tags,
            attributes: ["name"],
          },
        ],
  
        where: {
          id: id,
        },
      });
      let response = {
        success: true,
        data: onetomanydata,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var manytomayinsert = async (req,res)=>{
      let { name, email, title, content,tagId } = req.body;
      let datainsert = await Users.create({
        name: name,
        email: email,
      });
  
      if (datainsert && datainsert.dataValues.id) {
        await Posts.create({
          name: name,
          title: title,
          content: content,
          UserId: datainsert.dataValues.id,
        });
        if (datainsert && datainsert.dataValues.id) {
          await Post_tag.create({
              PostId:datainsert.dataValues.id,
              tagId: tagId,
          });
      }
      let response = {
          success: true,
          data: datainsert,
        };
        res.status(200).json(response);
      }
  }
  var scope = async (req, res) => {
    let scope = await Users.scope("checkstatus").findAll({});
    let scopes = await Users.scope("includeposts").findAll({});
  
    let { name, email, title, content, postId, tagId } = req.body;
  
    let datainsertmanys = await Users.create(
      {
        name: name,
        email: email,
      },
  
      {
        include: [
          {
            model: Posts,
          },
        ],
        include: [
          {
            model: Tags,
          },
        ],
        include: [
          {
            model: Post_tag,
          },
        ],
      }
    );
  
    let responce = {
      success: true,
      data: datainsertmanys,
    };
  
    res.status(200).json(responce);
  };
  
  var hook = async (req, res) => {
    let hook = await Users.create({
      name: "krupali",
      email: "kupali@gmail.com",
      course_name: "it",
    });
    let responce = {
      success: true,
      data: hook,
    };
  
    res.status(200).json(responce);
  };
  // ...............polymorphics...........
var poly = async (req, res) => {
    try {
      let { title, url, title2, text, type, title3, id } = req.body;
      let datainsert = await Images.create({
        title: title,
        url: url,
      });
      if (datainsert) {
        await Videos.create({
          title: title2,
          text: text,
        });
      }
      if (datainsert && datainsert.dataValues.id) {
        await Comments.create({
          title: title3,
          commentableType: type,
          commentableId: id,
        });
      }
      let responce = {
        success: true,
        data: datainsert,
      };
      res.status(200).json(responce);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var polymanytomany = async (req, res) => {
    try {
      let polymanytomany = await Tags.findAll({
        include: [{ model: Images }],
      });
      let responce = {
        success: true,
        data: polymanytomany,
      };
      res.status(200).json(responce);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  var manytomanyinclude = async (req, res) => {
    // const post = req.body.post;
  
    const post_tag = req.body.post_tag;
   let inc =  await Users.create(
      {
        name: req.body.name,
        email: req.body.email,
        
        // Posts: [...post],
        Post_tag: [...post_tag],
      },
      // {
      //   include: [db.posts],
      // },
      {
        include: [db.post_tags],
      }
    )
    let responce = {
      success: true,
      data: inc,
    };
    res.status(200).json(responce);
  
  };
  var onetomanyinclude = async (req, res) => {
    try {
      const { email, name } = re.body;
      var datas = await Users.update(
        {
          name: name,
          email: email,
        },
        {
          where: {
            id: 419,
          },
        }
      );
      let responce = {
        success: true,
        data: datas,
      };
      res.status(200).json(responce);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  };
  module.exports = {onetomanyinclude,manytomanyinclude,polymanytomany,poly,bulk,crudoperation,ope,onetomany,Insertasso,Updateasso,onetomany2,practice2,practice,searchpag,softdelete,restore,manytomanyjun,manytomanyjunselect,manytomayinsert,scope,hook}
