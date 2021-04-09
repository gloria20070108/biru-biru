const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const q = require("q");
const ObjectId = require("mongodb").ObjectID;

dotenv.config();
const uri = process.env.MONGO_URI;

exports.getBeers = (style, country, flavor, sortOption) => {
  const deferred = q.defer();

  const params = {};
  if (style) {
    params.style = style;
  }

  if (country) {
    params.country = country;
  }

  if (flavor) {
    params.flavors = flavor;
  }

  const sortParam = {};
  if (sortOption.endsWith("-")) {
    sortParam[sortOption.slice(0, -1)] = -1;
  } else {
    // ends with "+"
    sortParam[sortOption.slice(0, -1)] = 1;
  }
  sortParam.name = 1;
  MongoClient.connect(uri, (err, client) => {
    const db = client.db("beers");
    const collection = db.collection("beers");
    const result = collection.find(params).sort(sortParam).toArray();
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

exports.getBeerById = (id) => {
  const deferred = q.defer();

  MongoClient.connect(uri, (err, client) => {
    const db = client.db("beers");
    const collection = db.collection("beers");
    const result = collection.findOne({ _id: ObjectId(id) });
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

exports.getStyles = () => {
  const deferred = q.defer();

  MongoClient.connect(uri, (err, client) => {
    const db = client.db("beers");
    const collection = db.collection("styles");
    const result = collection.find().sort({ name: 1 }).toArray();
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

exports.getCountries = () => {
  const deferred = q.defer();

  MongoClient.connect(uri, (err, client) => {
    const db = client.db("beers");
    const collection = db.collection("countries");
    const result = collection.find().sort({ name: 1 }).toArray();
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

exports.getFlavors = () => {
  const deferred = q.defer();

  MongoClient.connect(uri, (err, client) => {
    const db = client.db("beers");
    const collection = db.collection("flavors");
    const result = collection.find().sort({ name: 1 }).toArray();
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

exports.addNewComment = (beerId, newComment, user) => {
  const deferred = q.defer();
  MongoClient.connect(uri, (err, client) => {
    const db = client.db("beers");
    const collection = db.collection("comments");

    const comment = {
      beer_id: beerId,
      comment: newComment,
      user: user,
    };

    const result = collection.insertOne(comment);
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

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
