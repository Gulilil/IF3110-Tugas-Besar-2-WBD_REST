import { Pool } from "pg";
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

export function DatabaseSetup() {
  const dbFunctions : string[] = getFiles(path.join("/app/src/database/functions"));
  for (const func of dbFunctions){
    const db = new Database;
    const pool = db.getPool();
    const q = fs.readFileSync(func).toString();
    console.log(q)
    async () => {
      const result : any = await pool
        .query(q);
    }

  }
  const dbTriggers : string[] = getFiles(path.join("/app/src/database/triggers"));
  for (const trg of dbTriggers){
    const db = new Database;
    const pool = db.getPool();
    const q = fs.readFileSync(trg).toString();
    console.log(q)
    async () => {
      const result : any = await pool.query(q);
    }
  }
}