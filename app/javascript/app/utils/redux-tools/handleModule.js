import handleActions from './handleActions';

export default function handleModule(moduleFile) {
  const { reducers, initialState } = moduleFile;
  if (!reducers.default) {
    return console.warn(
      "You are attempting to connect a module that doesn't export any default reducers."
    );
  }
  return handleActions(reducers.default || reducers, initialState || {});
}
