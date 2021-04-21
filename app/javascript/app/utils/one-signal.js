export default ({ ONE_SIGNAL_ID, env }) => {
  if (env === 'production') {
    const oneSignalScript = document.createElement('script');
    oneSignalScript.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
    oneSignalScript.async = '';

    const oneSignalSecondScript = document.createElement('script');
    oneSignalSecondScript.innerHTML = `
      window.OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
        OneSignal.init({
          appId: ${ONE_SIGNAL_ID}
        });
      });
    `;
    document.head.appendChild(oneSignalScript);
    document.head.appendChild(oneSignalSecondScript);
  }
};
