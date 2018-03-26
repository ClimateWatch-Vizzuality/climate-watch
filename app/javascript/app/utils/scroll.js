export function scrollIt(
  destination,
  duration = 200,
  easing = 'linear',
  callback
) {
  const easings = {
    linear(t) {
      return t;
    },
    smooth(t) {
      const twiceTime = 2 * t;
      return t < 0.5 ? twiceTime * t : (-1 + (4 - twiceTime)) * t;
    }
  };

  const start = window.pageYOffset;
  const startTime =
    'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;

  const destinationOffset =
    typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  );

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now =
      'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    const offset = destinationOffsetToScroll - start;
    window.scroll(0, Math.ceil(timeFunction * (offset + start)));

    const DESTINATION_OFFSET = 10;
    const destinationRangeMax =
      Math.ceil(window.pageYOffset) + DESTINATION_OFFSET;
    const destinationRangeMin =
      Math.ceil(window.pageYOffset) - DESTINATION_OFFSET;

    if (
      destinationOffsetToScroll > destinationRangeMin &&
      destinationOffsetToScroll < destinationRangeMax
    ) {
      if (callback) {
        callback();
      }
      return;
    }
    requestAnimationFrame(scroll);
  }
  scroll();
}

export default {
  scrollIt
};
