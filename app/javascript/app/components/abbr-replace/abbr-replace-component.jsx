import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace-recursively';
import { ABBREVIATIONS, SUBSCRIPTS } from './abbr-replace-data';

// Be careful with the layout once we add the AbbrReplace component as it may change if we have flex display
// To fix it we can use the fixLayout prop that embeds the content in a div
// The replace component also adds subscripts defined on the subscripts array

const AbbrReplace = ({ children, fixLayout }) => {
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

export default AbbrReplace;
