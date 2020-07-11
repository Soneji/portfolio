/* tslint:disable:max-line-length */
import { getDeepByKey } from './core/helpers/utils';
import { triggerAsyncId } from 'async_hooks';

/*
 * After editing - restart the server for the change to take effect.
 */

export default {
  global: {

    /**
     * The value is the name of the folder, all templates
     * you can find by the current path:
     *    ./src/templates
     * You can also create your own template, which is
     * described in this file:
     *    README.md
     * @type {string}
     * @default default
     */
    template: 'default',

    /**
     * If the repository is called: <username>.github.io
     *  Then the value is empty
     * If the repository is called: portfolio, or any other name
     *  Then the value of <name of repository>
     * @type {string}
     */
    base: 'portfolio',

    /**
     * The Open Graph protocol
     *  key - property
     *  value - content
     * @type {Object}
     * @see http://ogp.me/
     * @example
     *  'og:title': 'My portfolio'
     * @default
     *  og:title => Portfolio by {name from Github},
     *  og:type => profile,
     *  og:image => {avatar url from Github},
     *  og:url => {site url},
     *  profile:username => {username}
     */
    opg: {
      'profile:first_name': 'Dhaval',
      'profile:last_name': 'Soneji',
      'og:url': 'https://soneji.xyz',
      'og:description': 'Portfolio by Dhaval Soneji, Software and Electronic Engineer',
      'description': 'Portfolio by Dhaval Soneji, Software and Electronic Engineer',
      'og:keywords': 'Dhaval Soneji, Soneji, soneji, web dev, web development, website developer, web developer, dhavalsoneji, dhavalsonejii, dhaval soneji, students, london developer, london dev, english dev, english developer, graphic design, commercial web design, commercial web development, e-commerce website design, mobile, Search Engine Optimisation, SEO, brand development',
      'og:author': 'Dhaval Soneji'
    },

    /**
     * Override options for WebpackPwaManifest plugin
     * @type {Object}
     * @see https://github.com/arthurbergmz/webpack-pwa-manifest
     * @example
     *  For change description and background color:
     *    { description: 'My portfolio', background_color: '#333' }
     */
    pwa: {
      //
    },

    /**
     * If you are deploying to a custom domain
     * @type {string}
     * @example
     *  www.example.com
     */
    customDomain: 'soneji.xyz',
  },

  data: {

    /**
     * Your name
     * @type {string}
     */
    name: (modules: any) => {
      let val = getDeepByKey(modules, ['github', 'profile', 'name']);

      if (!val) {
        val = getDeepByKey(modules, ['dribbble', 'profile', 'name']);
      }

      return val;
    },

    /**
     * Profile picture
     * @type {string}
     */
    avatar_url: (modules: any) => {
      let val = getDeepByKey(modules, ['github', 'profile', 'avatar_url']);

      if (!val) {
        val = getDeepByKey(modules, ['dribbble', 'profile', 'avatar_url']);
      }

      return val;
    },

    /**
     * @type {string}
     */
    position: 'Software and Electronic Engineer',

    /**
     * Searching for a job
     * @type {boolean}
     */
    hire: (modules: any) => {
      return !!getDeepByKey(modules, ['github', 'profile', 'hireable']);
    },

    /**
     * You are in social networks
     * @type {Array}
     */
    socialMedia: [
      { name: 'Github', icon: 'github', link: 'https://github.com/overclockedllama' },
      // { name: 'Instagram', icon: 'instagram', link: 'https://instagram.com/dhaval.py' },
      { name: 'Monzo', icon: 'monzo', link: 'https://monzo.me/dhavalsoneji' },
      { name: 'Mail', icon: 'mail', link: 'mailto:dhaval@soneji.xyz' },
    ],

    devTools: [
      { name: 'Cloudflare', icon: 'cloudflare', link: 'https://dash.cloudflare.com/' },
      { name: 'Droppy', icon: 'dropbox', link: 'https://droppy.soneji.xyz/' },
      { name: 'Chrome', icon: 'googlechrome', link: 'https://chrome.soneji.xyz/' },
      { name: 'Firefox', icon: 'mozillafirefox', link: 'https://firefox.soneji.xyz/' },
      { name: 'Images', icon: 'images', link: 'https://images.soneji.xyz/' },
      { name: 'Cloud', icon: 'nextcloud', link: 'https://cloud.soneji.xyz/' },
      { name: 'Plex', icon: 'plex', link: 'https://plex.soneji.xyz/' },
      { name: 'QB', icon: 'qi', link: 'https://qb.soneji.xyz/' },
      { name: 'Spotify', icon: 'spotify', link: 'https://open.spotify.com/user/dhaval.soneji' },
      { name: 'VSCode', icon: 'vscode', link: 'https://code.soneji.xyz/' },
    ],
    aboutMe: `
    I am an Electronic Engineering Student at the University of Warwick. Topics that interest me include: 
    software engineering, cyber security, open source, developer operations.
    <br><br>
    If you’d like to get in touch with me via email, click <a href="mailto:dhaval@soneji.xyz">here</a>.
    `,
    technologies: [
      'Python',
      'JavaScript',
      'C / C++',
      'PHP',
      'Docker',
      'LaTeX',
      'MATLAB',
      'Autodesk Fusion 360',
      'Arduino',
      'Shell Scripting',
      'MySQL',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'MS Office',
    ]
  },

  modules: {
    github: {

      /**
       * Set your login from github, after the build we will receive
       * data from this profile (name, projects, etc.)
       * @type {string}
       * @example
       *  You can find the login from the address bar, for example, value will be:
       *    alexeykhr
       *  From url https://github.com/alexeykhr
       */
      username: 'overclockedllama',

      /**
       * NOTICE: Set value in .env file
       * If a token is specified, then all repositories will be
       *  displayed (including from organizations)
       * Only one access is needed to:
       *  public_repo - Access public repositories
       * @type {string}
       * @see https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
       */
      token: process.env.GITHUB_TOKEN || '',

      /**
       * Various configurations are stored that will filter
       * the received data with the Github API
       * @type {object}
       */
      parse: {

        /** @see https://developer.github.com/v3/repos/#list-user-repositories docs */
        repositories: {

          /**
           * Not used if token is present. Instead, use: visibility, affiliation.
           * @type {string} - all, owner, member
           * @default owner
           */
          type: 'owner',

          /**
           * @type {string} - created, updated, pushed, full_name
           * @default full_name
           */
          sort: 'full_name',

          /**
           * @type {string} - asc, desc
           * @default asc when using full_name, otherwise desc
           */
          direction: 'asc',

          /**
           * ONLY IF THE TOKEN IS SPECIFIED
           * @type {string} - all, public, private
           * @default all
           */
          visibility: 'public',

          /**
           * ONLY IF THE TOKEN IS SPECIFIED
           * Comma-separated list of values
           * @type {string}
           *  owner: Repositories that are owned by the authenticated user.
           *  collaborator: Repositories that the user has been added to as a collaborator.
           *  organization_member: Repositories that the user has access to through being a member
           *    of an organization. This includes every repository on every team that the user is on.
           * @default owner,collaborator,organization_member
           */
          affiliation: 'owner,collaborator,organization_member',
        },
      },

      filter: {

        /**
         * @type {IFilters[]}
         * @see core/interfaces/IGithib.ts identify attributes
         * @see docs/config.md #Filters
         */
        repositories: [
          //

          // {
          //   attr: 'name', values: [
          //     "gocode-academy.github.io",
          //     "gocode2018.github.io",
          //     "echo360",
          //     "greenlight",
          //     "lenamd.com",
          //     "double-pendulum",
          //     "GPortfolio",
          //     "kcsoc_audiobooks",
          //     "overclockedllama.github.io",
          //     "shodan-python",
          //     "repo",
          //     "WhatsAppForiPad",
          //     ""

          //   ], revert: true, more: ''
          // }

          { attr: 'fork', values: true, revert: true, more: '&& name!=\'flappy-musk\' ' },
          { attr: 'owner.login', values: /gocode/i, revert: true, more: '' },
          { attr: 'owner.login', values: /lena/i, revert: true, more: '' },
          { attr: 'name', values: 'kcsoc_audiobooks', revert: true, more: '' },
          { attr: 'name', values: 'overclockedllama.github.io', revert: true, more: '' },
          { attr: 'name', values: 'portfolio', revert: true, more: '' },




        ],
      },

      sort: {

        /**
         * @type {ISort}
         * @see core/interfaces/IGithib.ts identify attributes
         * @example
         *  { attr: 'stargazers_count', enable: true, sortByDesc: true }
         *  { attr: 'owner.id', enable: true, sortByDesc: false }
         */
        repositories: {
          attr: 'stargazers_count',
          enable: true,
          sortByDesc: true,
        },
      },
    },

    dribbble: {

      auth: {
        /**
         * NOTICE: Set value in .env file
         * @type {string}
         */
        client_id: process.env.DRIBBBLE_CLIENT_ID || '',

        /**
         * NOTICE: Set value in .env file
         * @type {string}
         */
        client_secret: process.env.DRIBBBLE_CLIENT_SECRET || '',

        /**
         * NOTICE: Set value in .env file
         * NOTE: Code is valid only once when receiving a token
         * @type {string}
         */
        code: process.env.DRIBBBLE_CODE || '',
      },

      filter: {

        /**
         * @type {IFilters[]}
         * @see core/interfaces/IDribbble.ts identify attributes
         * @see docs/config.md #Filters
         */
        shots: [
          //
        ],
      },

      sort: {

        /**
         * @type {ISort}
         * @see core/interfaces/IDribbble.ts identify attributes
         * @example
         *  { attr: 'id', enable: true, sortByDesc: true }
         */
        shots: {
          attr: 'id',
          enable: false,
          sortByDesc: true,
        },
      },
    },
  },

  templates: {
    default: {

      /**
       * @type {string}
       * @see docs/config.md #Image
       */
      background: '',

      /**
       * Number of items to display, the rest will be hidden and displayed
       * when you click on the button (for the same number of elements)
       *  0 - display all
       * @type {number}
       */
      github_repositories_more: 25,

      /**
       * Same as github_repositories_more
       * @type {number}
       */
      dribbble_shots_more: 25,
    },
  },
};
