import { singleton } from "tsyringe";
import { MongodbHolder } from "../resource/mongodb-holder";

@singleton()
export class UserRepository {
  private colUser;

  constructor({ colUser }: MongodbHolder) {
    this.colUser = colUser;
  }
  findById(id: number) {
    return this.colUser.findOne({
      id,
    });
  }
}
