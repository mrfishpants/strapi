'use strict';

/**
 * website-settings service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::website-settings.website-settings');