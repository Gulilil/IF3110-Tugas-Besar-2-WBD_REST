# IF3110 Tugas Besar 2 WBD_REST

## *Tubes1_Kelompok 8*

## **Table of Contents**
* [Program Description](#program-description)
* [Required Program](#required-program)
* [Used Packages](#used-packages)
* [Database Schema](#database-schema)
* [Endpoints](#endpoints)
* [Execution Guide](#execution-guide)
* [Progress Report](#progress-report)
* [Workload Distribution](#workload-distribution)

## **Program Description**
REST protocol based Web Service that provides the service for Web Method for **InfoAnimeMasse** app.

## **Program Requirement**
Here are the requirements to run the program
| Requirements | Reference Link | Additional Description |
|--------------|----------------|--------------------------|
| NodeJS      |   | `npm i --save-dev @types/node` |
| ExpressJS   |   |  |
| Docker | [Docker](https://docs.docker.com/desktop/install/windows-install/) |  |


## **Used Packages**
Here are the packages used in the program
| Packages | Reference Link | Additional Description |
|----------|------------------------|----|
| nodemon | [nodemon](https://www.npmjs.com/package//nodemon) | `npm install --save-dev nodemon` |
| dotenv  | [dotenv](https://www.npmjs.com/package/dotenv)  | |
| pg    | [pg](https://www.npmjs.com/package/pg)| `npm i --save-dev @types/pg` |
| axios | [axios](https://www.npmjs.com/package/axios) | `npm install axios` |
| easy-soap-request | [easy-soap-request](https://www.npmjs.com/package/easy-soap-request)  | `npm install easy-soap-request` |
| xml-js | [xml-js](https://www.npmjs.com/package/xml-js) | npm install --save xml-js |

## **Endpoints**
Will be added later

## **Database Schema**
Will be added later

## **Execution Guide**
```
docker compose up --build
```


## **Workload Distribution**
| Name                     | Student ID | Functionality | 
|--------------------------|------------|-------------|
| Irfan                    | 10023176   |  |
| Bagas Aryo Seto          | 13521081   | Controller, models, routes, config, jwt |
| Juan Christopher Santoso | 13521116   | Database connection, seeding, soap connection |
