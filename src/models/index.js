'use strict';

import { readdir } from 'fs/promises';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
const basename = _basename(__filename);
const models = {};

const sequelize = new Sequelize('sqlite::memory:');

export async function initModels () {
  const files = await readdir(__dirname);
  await Promise.all(files.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }).map(async file => {
    const model = (await import(join(__dirname, file))).default(sequelize, DataTypes);
    models[model.name] = model;
  }));

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return sequelize;
}
export { sequelize };
export { Sequelize };

export default models;
