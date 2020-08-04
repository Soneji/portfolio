import config from "../../../config";
import Cache from "../../classes/Cache";
import Filter from "../../classes/Filter";
import Sort from "../../classes/Sort";
import variables from "../../variables";
import Github from "./Github";
import axios from "axios";
import cheerio from "cheerio";
import { data } from "autoprefixer";
var request = require("request");
/**
 * @return {Promise<IGithubRepository[]>}
 * @throws
 */
export default async () => {
  const github = config.modules.github;
  let contributions;
  async function getQL() {
    let data;
    await axios({
      url: "https://api.github.com/graphql",
      method: "POST",
      headers: {
        Authorization: `token ${config.modules.github.token}`,
      },
      data: {
        query: `
      {
        user(login: "${config.modules.github.username}") {
            contributionsCollection {
                pullRequestContributions(last: 100) {
                    nodes {
                        pullRequest {
                            merged
                            repository {
                                owner {
                                    login
                                }
                                nameWithOwner
                                url
                                stargazers {
                                    totalCount
                                }
                                primaryLanguage {
                                    name
                                }
                                description
                            }
                        }
                    }
                }
            }
        }
    }
    `,
      },
    }).then((response) => {
      //$.data.user.contributionsCollection.pullRequestContributions.nodes.*.pullRequest.repository.name
      data = response.data.data;
      data = data.user.contributionsCollection.pullRequestContributions.nodes;
      data = data.map((a) => a.pullRequest);
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.merged == false) {
          data.splice(i, 1);
        }
      }

      data = data.map((a) => a.repository);
      data = Array.from(new Set(data.map((a) => a.nameWithOwner))).map(
        (nameWithOwner) => {
          return data.find((a) => a.nameWithOwner === nameWithOwner);
        }
      );
    });
    return data;
  }

  contributions = await getQL();

  const filter = new Filter(github.filter.contributions);
  if (filter.exists) {
    contributions = filter.run(contributions);
    Github.log(
      Github.sections.contributions,
      `Filter, ${contributions.length} length`
    ).info();
  }
  if (github.sort.contributions.enable) {
    const sort = new Sort(contributions);
    github.sort.contributions.sortByDesc
      ? sort.desc(github.sort.contributions.attr)
      : sort.asc(github.sort.contributions.attr);
  }
  for (let i = 0; i < contributions.length; i++) {
    const repo = contributions[i];
    let url;
    url = repo.url;
    await axios(url).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const meta_s = $("meta");
      for (let i = 0; i < meta_s.length; i++) {
        const meta = meta_s[i];
        // console.log(meta.attribs);
        if (meta.attribs.property == "og:image") {
          let value = meta.attribs.content;
          if (!value.includes("avatars")) {
            repo.img = value;
          }
        }
      }
    });
  }
  return contributions;
};
