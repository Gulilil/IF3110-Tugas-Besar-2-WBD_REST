import dotenv from "dotenv";
import { Pool, PoolClient, Client } from "pg";

class Database {
  private pool: Pool;
  private client: Client;

  public getPool(): Pool {
    return this.pool;
  }

  public getClient() : Client{
    return this.client;
  }

  constructor() {
    const dbUsername = process.env.POSTGRES_USER;
    const dbPassword = process.env.POSTGRES_PASSWORD;
    const dbName = process.env.POSTGRES_DB;
    const dbHost = process.env.POSTGRES_HOST;
    const dbPort = parseInt(process.env.POSTGRES_PORT || "5432");

    this.pool = new Pool({
      user: dbUsername,
      host: dbHost,
      database: dbName,
      password: dbPassword,
      port: dbPort,
      max: 20,
      idleTimeoutMillis: 30000,
    });

    this.client = new Client({
      host: dbHost,
      user: dbUsername,
      database: dbName,
      password: dbPassword,
      port: dbPort,
    });
  }

  public executeTransaction = async (callback : Function) => {
    await this.client.connect();
    try {
      await this.client.query("BEGIN");
      try {
        await callback(this.client);
        await this.client.query("COMMIT");
      } catch (e){
        await this.client.query("ROLLBACK");
        console.error(e);
      }
    } finally {
      await this.client.end();
    }
  }
}

export default Database;
