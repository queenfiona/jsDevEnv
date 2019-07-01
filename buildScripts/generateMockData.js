/* Script generates mock data for local development.*/

/* eslint-disable no-console*/

import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema.js';
import fs from 'fs';
import chalk from 'chalk';


const json = JSON.stringify(jsf.generate(schema));

fs.writeFile('./src/api/db.json', json,(err)=>{
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated"));
  }
});
