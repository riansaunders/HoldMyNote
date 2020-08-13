module.exports = {
  client: {
    includes: ["../hmn/**/*.tsx"],
    service: {
      name: "HMN",
      url: "http://localhost:3000/api/graphql",

      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
