import Container from "typedi";
import { Repository } from "typeorm";
import { dataSource } from "../../DB/dataSource";

export const InjectRepository = <T>(Repo: any) => {
  return function (object: any, propertyName: string, index?: number) {
    const repo = dataSource.getRepository<T>(Repo);
    // console.log(repo, "repo decoator");
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: (containerInstance) => repo,
    });
  };
};
