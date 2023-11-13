import { Client, Pool } from "pg";
import Database from "../models/database-model";

const pg = require('pg');
const fs = require('fs');
const path = require('path')

function getFiles(path: string){
  const res: string[] = [];
  const fileList = fs.readdirSync(path);
  for (const file of fileList){
    const fileName = `${path}/${file}`;
    res.push(fileName);
  }
  return res;
}

function delay(time : number){
  return new Promise (resolve => setTimeout(resolve, time));
} 

function executeSQLFile(path : string){
  const db = new Database;
  const q = fs.readFileSync(path).toString();
  // console.log(q);
  db.executeTransaction( async (client: Client) => {
    await client.query(q);
    await delay(1500);
  })
}

export function DatabaseSetup() {

  // Dummy
  const db = new Database;

  const dbFunctions : string[] = getFiles(path.join("/app/src/database/functions"));
  for (const func of dbFunctions){
    executeSQLFile(func);
  }

  const dbTriggers : string[] = getFiles(path.join("/app/src/database/triggers"));
  for (const trg of dbTriggers){
    executeSQLFile(trg);
  }
}