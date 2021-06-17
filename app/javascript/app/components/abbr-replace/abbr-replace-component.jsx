import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace-recursively';
import { ABBREVIATIONS, SUBSCRIPTS, CONFLICTS } from './abbr-replace-data';

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

// This component exports a component and a function: replaceStringAbbr (just for the dangerouslySetInnerHTML case),
// to transform the abbreviations on the ./abbr-replace-data file into an abbr tags
// Be careful with the layout once we add the AbbrReplace component as it may change if we have flex display
// This function also adds subscripts defined on the subscripts array

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

const FEATURE_ABBREVIATIONS = process.env.FEATURE_ABBREVIATIONS === 'true';

const AbbrReplace = ({ children, fixLayout }) => {
  if (!FEATURE_ABBREVIATIONS) return children;

  const [config, setConfig] = useState();
  useEffect(() => {
    const initialConfig = {};
    Object.keys(ABBREVIATIONS).forEach(abbr => {
      initialConfig[`A-${abbr}`] = {
        pattern: new RegExp(`(${abbr})`, 'g'),
        matcherFn: (rawText, processed, key) => (
          <abbr key={key} title={ABBREVIATIONS[abbr]}>
            {processed}
          </abbr>
        )
      };
    });
    SUBSCRIPTS.forEach(subscript => {
      initialConfig[`B-${subscript}`] = {
        pattern: new RegExp(`(${subscript})`, 'g'),
        matcherFn: () => {
          const getNumbers = /(\d+)$/g;
          const splittedText = subscript.split(getNumbers);
          // eslint-disable-next-line no-confusing-arrow
          return splittedText.map(chunk =>
            isNaN(parseInt(chunk, 10)) ? chunk : <sub>{chunk}</sub>
          );
        }
      };
    });
    setConfig(initialConfig);
  }, []);

  const replaceChunk = text => reactStringReplace(config)(text);

  const traverseChunk = chunk => {
    if (chunk === undefined || chunk === null) {
      return chunk;
    }

    if (typeof chunk === 'string') {
      return replaceChunk(chunk);
    }

    if (typeof chunk === 'object' && chunk.props && chunk.props.children) {
      const updatedChildren = traverseChildren(chunk.props.children);
      return React.cloneElement(chunk, {}, updatedChildren);
    }

    return chunk;
  };

  // eslint-disable-next-line no-confusing-arrow
  const traverseChildren = _children =>
    typeof _children === 'string'
      ? replaceChunk(_children)
      : React.Children.map(_children, traverseChunk);

  const tryTraverseChildren = () => {
    try {
      return traverseChildren(children);
    } catch (error) {
      console.warn('Error in abbreviation replacement', { error, children });
      return children;
    }
  };

  // eslint-disable-next-line no-confusing-arrow
  const renderReplacedChilden = () =>
    fixLayout ? <div>{tryTraverseChildren()}</div> : tryTraverseChildren();

  return children && config ? renderReplacedChilden() : children;
};

AbbrReplace.propTypes = {
  children: PropTypes.node.isRequired,
  fixLayout: PropTypes.bool
};

AbbrReplace.defaultProps = {
  fixLayout: false
};

export const replaceStringAbbr = text => {
  if (!FEATURE_ABBREVIATIONS) return text;

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

export default AbbrReplace;
