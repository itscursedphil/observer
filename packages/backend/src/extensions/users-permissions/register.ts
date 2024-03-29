import { Strapi } from '@strapi/strapi';

import registerGraphQlQueryExtensions from './graphql/queries';
import registerGraphQlShadowCrudExtensions from './graphql/shadowCrud';

const registerExtensions = (strapi: Strapi) => {
  registerGraphQlQueryExtensions(strapi);
  registerGraphQlShadowCrudExtensions(strapi);
};

export default registerExtensions;
