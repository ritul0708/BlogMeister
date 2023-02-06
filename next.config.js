/** @type {import('next').NextConfig} */
// require('next-env')();

module.exports = {
  reactStrictMode: true,
  // change in next.config.js to use your environment variables
  env: {
    GRAPHCMS_API_ENDPOINT: "https://api-ap-south-1.hygraph.com/v2/cldium5ec0a9301t59g07ezzl/master",
  },
}
