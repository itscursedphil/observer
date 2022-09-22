import registerEventExtensions from './api/event/extensions/register';
import registerEventCategoryExtensions from './api/event-category/extensions/register';
import registerUsersPermissionsPluginExtensions from './extensions/users-permissions/register';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    registerEventExtensions(strapi);
    registerEventCategoryExtensions(strapi);
    registerUsersPermissionsPluginExtensions(strapi);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // bootstrap(/* { strapi } */) {},
};
