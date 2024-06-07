const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Sort cover and toc to front of collection
  eleventyConfig.addCollection("chaptersSorted", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/ebooks/*/chapters/*.md").sort((a, b) => {
      if (a.fileSlug === "cover") return -1;
      if (b.fileSlug === "cover") return 1;
      if (a.fileSlug === "table-of-contents") return -1;
      if (b.fileSlug === "table-of-contents") return 1;
      return 0;
    });
  });

  // Generate a collection of all books
  eleventyConfig.addCollection("allBooks", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/ebooks/*/").map(book => {
      return {
        title: book.data.title || "Untitled Book",
        link: book.fileSlug
      };
    });
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

    let data = width === 260 ? metadata.jpeg[0] : metadata.jpeg[1];

		return `<img src="${data.url}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async">`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
