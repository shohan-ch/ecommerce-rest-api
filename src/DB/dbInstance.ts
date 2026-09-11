import { dataSource } from "./dataSource";

class DbInstance {
  async connect() {
    try {
      const db = await dataSource.initialize();
      //   console.log("DB Ok", db);
    } catch (error) {
      console.log("db not connected", error);
    }
  }
}

export default new DbInstance();
