import { ABBREVIATIONS, CONFLICTS } from './abbr-replace-data';

// This function just replace the text for the dangerouslySetInnerHTML cases

const replaceText = (text, replacements) => {
  let updatedText = text;
  const replacedTerms = [];
  Object.keys(replacements).forEach(term => {
    const termConflicts = replacedTerms.map(t => CONFLICTS[t]);
    if (termConflicts.includes(term)) {
      return;
    }

    const replacedText = updatedText.replace(
      new RegExp(term, 'g'),
      replacements[term]
    );
    if (replacedText !== updatedText) {
      replacedTerms.push(term);
    }
    updatedText = replacedText;
  });
  return updatedText;
};

const replaceAllButTags = (text, replacements) => {
  const splitTags = new RegExp('(<s*[^>]*>)(.*?)(<s*/s*.?>)?', 'g');
  const splittedText = text.split(splitTags);

  const replacedSplittedText = splittedText.map(textChunk => {
    const isReplaceableText =
      textChunk !== undefined &&
      textChunk !== null &&
      !textChunk.startsWith('<');
    return isReplaceableText ? replaceText(textChunk, replacements) : textChunk;
  });

  return replacedSplittedText.filter(Boolean).join('');
};

export const replaceStringAbbr = text => {
  try {
    if (text === undefined || text === null) return text;
    const replacements = {};
    Object.keys(ABBREVIATIONS).forEach(key => {
      replacements[
        key
      ] = `<abbr key="${key}" title="${ABBREVIATIONS[key]}">${key}</abbr>`;
    });
    return replaceAllButTags(text, replacements);
  } catch (error) {
    console.warn('Error replacing string text abbreviations', { error, text });
    return text;
  }
};
