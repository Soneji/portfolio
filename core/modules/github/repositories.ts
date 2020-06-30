import config from "../../../config";
import Cache from "../../classes/Cache";
import Filter from "../../classes/Filter";
import Sort from "../../classes/Sort";
import { IGithubRepository } from "../../interfaces/IGithub";
import variables from "../../variables";
import Github from "./Github";
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * @return {Promise<IGithubRepository[]>}
 * @throws
 */
export default async (): Promise<IGithubRepository[]> => {
  const github = config.modules.github;

  const cache = new Cache(variables.cache.github.repositories);
  cache.setTimeWait(1000 * 60 * 60 * 2); // 2 hours

  /** @type {IGithubRepository[]} - data from API */
  let repositories: IGithubRepository[];

  if (cache.needParse) {
    repositories = await Github.fetchRepositories();

    /*
     * Update cache and timestamp
     */
    cache.updateData(repositories);
    cache.updateTimestamp();
  } else {
    repositories = cache.dataFromFile;
    Github.log(
      Github.sections.repositories,
      `Get from cache, ${repositories.length} length`
    ).info();
  }

  /*
   * Filter repositories if need
   */
  const filter = new Filter(github.filter.repositories);
  if (filter.exists) {
    repositories = filter.run(repositories);
    Github.log(
      Github.sections.repositories,
      `Filter, ${repositories.length} length`
    ).info();
  }

  /*
   * Sort repositories if need
   */
  if (github.sort.repositories.enable) {
    const sort = new Sort(repositories);
    github.sort.repositories.sortByDesc
      ? sort.desc(github.sort.repositories.attr)
      : sort.asc(github.sort.repositories.attr);
  }
  for (let i = 0; i < repositories.length; i++) {
    const repo = repositories[i];
    // let url = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/.github/preview.jpg`;
    let url = repo.html_url;
    axios(url).then((response: { data: any }) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const metas = $("meta");
      for (let i = 0; i < metas.length; i++) {
        const meta = metas[i];
        // console.log(meta.attribs);
        if (meta.attribs.property == "og:image") {
          let value = meta.attribs.content;
          if (!value.includes("avatars")) {
            repo.blobs_url = value;
          }
        }
      }
    });
  }
  return repositories;
};
