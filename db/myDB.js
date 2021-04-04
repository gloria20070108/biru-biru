const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const q = require("q");

dotenv.config();
const uri = process.env.MONGO_URI;

exports.localReg = (username, password) => {
  const deferred = q.defer();

  MongoClient.connect(uri, (err, client) => {
    const db = client.db("users");
    const collection = db.collection("localUsers");

    //check if username is already assigned in our database
    collection.findOne({ username: username }).then((result) => {
      if (null != result) {
        console.log("USERNAME ALREADY EXISTS:", result.username);
        deferred.resolve(false); // username exists
      } else {
        const user = {
          username: username,
          password: password,
        };

        console.log("CREATING USER:", username);

        collection.insertOne(user).then(() => {
          client.close();
          deferred.resolve(user);
        });
      }
    });
  });

  return deferred.promise;
};

exports.localAuth = (username, password) => {
  const deferred = q.defer();

  MongoClient.connect(uri, (err, client) => {
    const db = client.db("users");
    const collection = db.collection("localUsers");

    collection.findOne({ username: username }).then((result) => {
      if (null == result) {
        console.log("USER NOT FOUND:", username);

        deferred.resolve(false);
      } else {
        console.log("FOUND USER: " + result.username);

        if (result.password === password) {
          deferred.resolve(result);
        } else {
          console.log("AUTHENTICATION FAILED");
          deferred.resolve(false);
        }
      }

      client.close();
    });
  });

  return deferred.promise;
};






