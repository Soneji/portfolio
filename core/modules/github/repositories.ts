import config from "../../../config";
import Cache from "../../classes/Cache";
import Filter from "../../classes/Filter";
import Sort from "../../classes/Sort";
import { IGithubRepository } from "../../interfaces/IGithub";
import variables from "../../variables";
import Github from "./Github";
import axios from "axios";
import cheerio from "cheerio";

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
    let url;
    url = repo.html_url;
    console.log(url)
    try {
      await axios(url).then((response: { data: any }) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const meta_s = $("meta");
        for (let i = 0; i < meta_s.length; i++) {
          const meta = meta_s[i];
          // console.log(meta.attribs);
          if (meta.attribs.property == "og:image") {
            let value = meta.attribs.content;
            if (!value.includes("avatars")) {
              repo.blobs_url = value;
            }
          }
        }
        
      });
    } catch(e) {
      console.log(e)
    }
    // url = "https://api.github.com/repos/" + repo.full_name + "/traffic/clones";
    // try {
    //   await axios({
    //     url: url,
    //     headers: {
    //       Authorization: `token ${config.modules.github.token}`,
    //     },
    //   }).then(
    //     (response: { data: any }) =>
    //       (repo.git_tags_url = JSON.stringify(response.data.count))
    //   );
    // } catch (e) {
    //   Github.log(Github.sections.repositories, e).error();
    //   throw new Error(e);
    // }
  }
  return repositories;
};
