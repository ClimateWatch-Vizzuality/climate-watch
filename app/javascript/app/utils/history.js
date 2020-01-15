import { toStartCase } from 'app/utils';

const getPreviousPathname = () =>
  sessionStorage.getItem('previousLocationPathname');
const getPreviousSearch = () =>
  sessionStorage.getItem('previousLocationSearch');

const shouldClearPath = clearRegexps => {
  const previousPathname = getPreviousPathname();
  if (!previousPathname) return false;
  clearRegexps.push(/\/error-page/);
  if (clearRegexps.some(r => previousPathname.match(r))) {
    sessionStorage.setItem('previousLocationPathname', '');
    return true;
  }
  return false;
};

const getPreviousPathLabel = directLinksRegexs => {
  const updatedPathname = getPreviousPathname();
  let lastPathLabel = {
    '/': 'Home'
  }[updatedPathname];

  directLinksRegexs.some(regexWithLabel => {
    const { regex, label } = regexWithLabel;
    if (updatedPathname && updatedPathname.match(regex)) {
      lastPathLabel = label;
      return true;
    }
    return false;
  });
  return lastPathLabel || (updatedPathname && toStartCase(updatedPathname));
};

export const previousPathLabel = (clearRegexs, directLinksRegexs) =>
  (shouldClearPath(clearRegexs) ? null : getPreviousPathLabel(directLinksRegexs));

export const getPreviousLinkTo = () => ({
  pathname: getPreviousPathname(),
  search: getPreviousSearch()
});
