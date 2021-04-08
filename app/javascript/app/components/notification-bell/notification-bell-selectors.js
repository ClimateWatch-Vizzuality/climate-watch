const getStateProps = state => ({
  notifications: state.notifications && state.notifications.data
});

export default getStateProps;
