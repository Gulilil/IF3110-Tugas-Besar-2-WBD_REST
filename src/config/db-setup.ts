const pg = require('pg');
const fs = require('fs');

function getFiles(path: string){
  const res: string[] = [];
  fs.readdir(path, function (e : any, files : any){
    if (e){
      return console.log("Unable to scan directory: "+ e);
    } else {
      files.foreEach(function (file : string) {
        res.push(file);
      })
    }
  })
  return res;
}

export function DatabaseSetup() {
  const tables : string[] = getFiles("../database/tables");
  const functions : string[] = getFiles("../database/functions");
  const triggers : string[] = getFiles("../database/triggers");
}