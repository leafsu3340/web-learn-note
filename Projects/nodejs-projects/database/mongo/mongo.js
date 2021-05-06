/*
 * @Description: mongo 原生驱动
 * @Author: dengxiaodong
 * @Date: 2021-05-06 11:47:22
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-05-06 14:48:19
 */
(async () => {
  const { MongoClient: MongoDB } = require("mongodb");
  // 创建客户端

  const client = new MongoDB(
    "mongodb://localhost:27017", // 协议：mongo
    {
      userNewUrlParser: true,
    }
  );
  let ret;
  // 创建连接
  ret = await client.connect(); // 连接是异步的
  console.log("ret:", ret);
  const db = client.db("test");
  const fruits = db.collection("fruits");

  // 添加文档
  ret = await fruits.insertOne({
    name: "芒果",
    price: 20.1,
  });
  console.log("插入成功", JSON.stringify(ret));

  // 查询文档
  ret = await fruits.findOne();
  console.log("查询文档:", ret);

  // 更新文档
  ret = await fruits.updateOne({ name: "芒果" }, { $set: { name: "苹果" } });
  console.log("更新文档", JSON.stringify(ret.result));

  // 删除文档
  ret = await fruits.deleteOne({ name: "苹果" });

  await fruits.deleteMany();

  client.close();
})();
