const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // sort cover and toc to front of collection
  eleventyConfig.addCollection("chaptersSorted", function (collectionApi) {
    const all = collectionApi.getAll();

    let sorted = [];
    for (const item of all[0].data.collections.chapter) {
      if (item.fileSlug === "cover") {
        sorted.splice(0, 0, item);
      } else if (item.fileSlug === "table-of-contents") {
        sorted.splice(1, 0, item);
      } else {
        sorted.push(item);
      }
    }

    return sorted;
  });

  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Copy img dir into _site/img
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
