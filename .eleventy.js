const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Generate a collection of all books with their chapters
  eleventyConfig.addCollection("booksWithChapters", function (collectionApi) {
    const books = collectionApi.getFilteredByGlob("src/ebooks/*/cover.md");
    const chapters = collectionApi.getFilteredByGlob("src/ebooks/*/chapters/*.md");

    return books.map(book => {
      const bookSlug = book.filePathStem.split("/")[2];
      const bookChapters = chapters
        .filter(chapter => chapter.inputPath.includes(bookSlug))
        .sort((a, b) => a.fileSlug.localeCompare(b.fileSlug));

      return {
        book: {
          ...book.data,
          slug: bookSlug,
        },
        chapters: bookChapters.map((chapter, index) => ({
          title: chapter.data.title,
          url: chapter.url,
          filePathStem: chapter.filePathStem,
          inputPath: chapter.inputPath,
          index: index,
          previous: index > 0 ? bookChapters[index - 1] : null,
          next: index < bookChapters.length - 1 ? bookChapters[index + 1] : null,
        }))
      };
    });
  });

  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("src/ebooks/**/*.png");

  eleventyConfig.addShortcode("image", function (src, alt, bookSlug) {
    let fullSrc = `/ebooks/${bookSlug}/images/${src}`;
    return `<img src="${fullSrc}" alt="${alt}">`;
  });

  eleventyConfig.addShortcode("img", function (src, alt, width, height, bookSlug) {
    let metadata = Image(src, {
      widths: [260, 570],
      formats: ["png"],
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