import dotenv from 'dotenv';
import { Pool, PoolClient} from "pg";

class Database {
  private pool : Pool;
  private client : PoolClient | undefined;

  constructor() {
    const dbUsername = process.env.POSTGRES_USER;
    const dbPassword = process.env.POSTGRES_PASSWORD;
    const dbName = process.env.POSTGRES_DB;
    const dbHost = process.env.POSTGRES_HOST;
    const dbPort = parseInt(process.env.POSTGRES_PORT || "5432");
    
    this.pool = new Pool ({
      user: dbUsername,
      host: dbHost,
      database : dbName,
      password : dbPassword,
      port : dbPort,
      max: 20,
      idleTimeoutMillis: 45000,
    })
  }

}