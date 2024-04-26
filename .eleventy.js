const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Copy img dir into _site/img
  console.log('move img into _site');
  eleventyConfig.addPassthroughCopy("img");

  // Async shortcode for optimizing/rendering images
  eleventyConfig.addShortcode("image", async function (src, alt, width, height) {
    let metadata = await Image(src, {
      widths: [260, 570],
      formats: ["jpeg"],
    });

    let data;

    if (width === 260) {
      data = metadata.jpeg[0];
    } else {
      data = metadata.jpeg[1];
    }

		return `<img src="${data.url}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async">`;
  });

  return {
    dir: {
      input: "src",
    },
  };
};
