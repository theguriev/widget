(() => {
  const iframe = document.createElement('iframe');
  iframe.src = './widget.html';
  iframe.id = 'widget';
  iframe.name = 'widget';
  iframe.style.border = '0';
  iframe.style.overflow = 'hidden';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '238px';
  iframe.style.height = '80px';
  document.body.append(iframe);

  const handleScroll = () => {
    const { widget } = window.frames as Window & { widget: Window };
    if (widget) {
      setTimeout(() => {
        widget.postMessage('scroll');
      }, 3 * 1000);
    }
    document.removeEventListener('scroll', handleScroll);
  };

  document.addEventListener('scroll', handleScroll);
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data === 'toggle' && iframe.style.height === '80px') {
      iframe.style.height = '300px';
    } else if (event.data === 'toggle' && iframe.style.height === '300px') {
      iframe.style.height = '80px';
    }
  });
})();
