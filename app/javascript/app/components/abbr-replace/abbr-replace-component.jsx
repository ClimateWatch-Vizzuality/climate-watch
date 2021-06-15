import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace-recursively';
import abbreviations from './abbr-replace-data';

const replaceText = (text, replacements) => {
  let updatedText = text;
  Object.keys(replacements).forEach(x => {
    updatedText = updatedText.replace(new RegExp(x, 'g'), replacements[x]);
  });
  return updatedText;
};

const replaceAllButTags = (text, replacements) => {
  const splitTags = new RegExp('(<s*[^>]*>)(.*?)(<s*/s*.?>)', 'g');
  const splittedText = text.split(splitTags);
  // eslint-disable-next-line no-confusing-arrow
  const replacedSplittedText = splittedText.map(textChunk =>
    textChunk.startsWith('<') ? textChunk : replaceText(textChunk, replacements)
  );
  return replacedSplittedText.join('');
};

const AbbrReplace = ({ children }) => {
  const [config, setConfig] = useState();
  const [stringConfig, setStringConfig] = useState();
  useEffect(() => {
    const initialConfig = {};
    Object.keys(abbreviations).forEach(abbr => {
      initialConfig[abbr] = {
        pattern: new RegExp(`(${abbr})`, 'g'),
        matcherFn: (rawText, processed, key) => (
          <abbr key={key} title={abbreviations[abbr]}>
            {rawText}
          </abbr>
        )
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
    if (typeof chunk === 'string') {
      return replaceChunk(chunk);
    }
    if (chunk.props && chunk.props.children) {
      const updatedChildren = traverseChildren(chunk.props.children);
      return React.cloneElement(chunk, {}, updatedChildren);
    }

    if (chunk.props && chunk.props.dangerouslySetInnerHTML) {
      const updatedChildren = replaceChunk(
        chunk.props.dangerouslySetInnerHTML.__html,
        true
      );
      return React.cloneElement(
        chunk,
        {},
        { dangerouslySetInnerHTML: { __html: String(updatedChildren[0]) } }
      );
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
