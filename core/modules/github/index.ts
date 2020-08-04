import profile from './profile';
import repositories from './repositories';
import contributions from './contributions.js';

/**
 * @throws
 */
export default async () => {
  return {
    profile: await profile(),
    repositories: await repositories(),
    contributions: await contributions(),
  };
};
