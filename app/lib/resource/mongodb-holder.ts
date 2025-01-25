import "reflect-metadata";

import { singleton, Disposable } from "tsyringe";
import { User } from "../model/user";
import { MongoClient } from "mongodb";

function joinConnectionString(uri: string, dbName?: string) {
  if (dbName === undefined) {
    return uri;
  }

  const [prefix, postfix] = uri.split("?");
  const tokens: string[] = [prefix];
  if (!prefix.endsWith("/")) {
    tokens.push("/");
  }
  tokens.push(dbName);
  if (postfix !== undefined) {
    tokens.push("?", postfix);
  }
  return tokens.join("");
}

@singleton()
export class MongodbHolder implements Disposable {
  private _client;
  private _db;
  readonly connectionString;

  readonly colUser;

  constructor() {
    const uri = process.env.DFAPP_MONGODB_URI ?? "";
    const dbName = process.env.DFAPP_MONGODB_DB ?? "";
    this.connectionString = joinConnectionString(uri, dbName);

    if (!uri) {
      throw new Error("Undefined env var: DFAPP_MONGODB_URI");
    }
    if (!dbName) {
      throw new Error("Undefined env var: DFAPP_MONGODB_DB");
    }

    this._client = new MongoClient(uri, {});
    const db = this._client.db(dbName);
    this._db = db;

    this.colUser = db.collection<User>("user");
  }

  get client() {
    return this._client;
  }

  get db() {
    return this._db;
  }

  dispose() {
    return this._client.close();
  }
}
