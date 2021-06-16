import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace-recursively';
import { abbreviations, subscripts } from './abbr-replace-data';

const replaceText = (text, replacements) => {
  let updatedText = text;
  Object.keys(replacements).forEach(x => {
    updatedText = updatedText.replace(new RegExp(x, 'g'), replacements[x]);
  });
  return updatedText;
};

// This component exports a component and a function: replaceStringAbbr (just for the dangerouslySetInnerHTML case)
// to transform the abbreviations on the ./abbr-replace-data file into an abbr tags
// Be careful with the layout once we add the AbbrReplace component as it may change if we have flex display
// This function also adds subscripts defined on the subscripts arrray

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

const AbbrReplace = ({ children }) => {
  const [config, setConfig] = useState();
  const [stringConfig, setStringConfig] = useState();
  useEffect(() => {
    const initialConfig = {};
    Object.keys(abbreviations).forEach(abbr => {
      initialConfig[`A-${abbr}`] = {
        pattern: new RegExp(`(${abbr})`, 'g'),
        matcherFn: (rawText, processed, key) => (
          <abbr key={key} title={abbreviations[abbr]}>
            {processed}
          </abbr>
        )
      };
    });
    subscripts.forEach(subscript => {
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

  useEffect(() => {
    const initialConfig = {};
    Object.keys(abbreviations).forEach(abbr => {
      initialConfig[abbr] = {
        pattern: new RegExp(`(${abbr})`, 'g'),
        matcherFn: (rawText, processed, key) =>
          `<abbr key={${key}} title={${abbreviations[abbr]}}>
            {${rawText}}
          </abbr>`
      };
    });
    setStringConfig(stringConfig);
  }, []);

  const replaceChunk = (text, isString) =>
    reactStringReplace(isString ? stringConfig : config)(text);

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

  return children && config ? tryTraverseChildren() : children;
};

AbbrReplace.propTypes = {
  children: PropTypes.node.isRequired
};

export const replaceStringAbbr = text => {
  const replacements = {};
  Object.keys(abbreviations).forEach(key => {
    replacements[
      key
    ] = `<abbr key="${key}" title="${abbreviations[key]}">${key}</abbr>`;
  });
  return replaceAllButTags(text, replacements);
};

export default AbbrReplace;
