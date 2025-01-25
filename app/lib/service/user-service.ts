import { singleton } from "tsyringe";
import { UserRepository } from "../repository/user-repository";

@singleton()
export class UserService {
  private userRepo;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async findById(id: number) {
    const foundUser = await this.userRepo.findById(id);

    if (!foundUser) {
      throw new Error("User not found");
    }

    return foundUser;
  }
}
