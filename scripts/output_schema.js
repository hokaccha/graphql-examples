import { printSchema } from 'graphql/utilities';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const ROOT_DIR = path.resolve(`${__dirname}/..`);

glob(`${ROOT_DIR}/examples/*/schema.js`, (err, files) => {
  if (err) throw err;

  files.forEach(filepath => {
    let schema = require(filepath).schema;
    let schemaString = printSchema(schema);
    let outputFilepath = filepath.replace(/\.js$/, '.graphql');
    fs.writeFileSync(outputFilepath, schemaString);
    console.log(`wrote: ${outputFilepath.replace(`${ROOT_DIR}/`, '')}`);
  });
});
