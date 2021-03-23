'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('products_tags', {
      id:{type:'int', primaryKey:true, autoIncrement:true},
      product_id:{
          type:'int',
          notNull:true,
          foreignKey: {
              name:'product_tag_fk',
              table:'products',
              mapping:'id',
              rules: {
                  onDelete:'cascade',
                  onUpdate:'restrict'
              }
          }
      },
      tag_id: {
          type:'int',
          notNull:true,
          foreignKey: {
              name:'tag_product_fk',
              table:'tags',
              mapping:'id',
              rules: {
                  onDelete: 'cascade',
                  onUpdate:'restrict'
              }
          }
      }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
