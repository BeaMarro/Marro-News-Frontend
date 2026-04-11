const ArticleValidation = {
    isHeadingValid: (heading) => {
      return heading.trim() !== '';
    },
    isHeadingLengthValid: (heading) => {
      const trimmedHeading = heading.trim();
      return trimmedHeading.length > 2 && trimmedHeading.length < 500;
    },
    isArticleTextValid: (text) => {
      return text.trim() !== '';
    },
    isArticleTextLengthValid: (text) => {
      const trimmedText = text.trim();
      return trimmedText.length > 50 && trimmedText.length < 8000;
    },
    isGenreValid: (genre) => {
        return genre.trim() !== '';
    },
    isCoverImageValid: (coverImage) => {
      return coverImage.trim() !== '';
    },
  };
  
  export default ArticleValidation;
  