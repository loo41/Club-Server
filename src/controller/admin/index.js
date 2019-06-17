const admin = require('./admin');
const active = require('./active');
const Log = require('./log');
const Mongo = require('./mongo');
const Banner = require('./banner');
const Article = require('./article');
const User = require('./user');
const Config = require('./config');
const Apply = require('./apply');

module.exports = {
  admin,
  active,
  Log,
  Mongo,
  Banner,
  Article,
  User,
  Config,
  Apply
}