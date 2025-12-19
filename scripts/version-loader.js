// Add version query to scripts and styles
(function () {
  const version = '2.2.2';
  const targets = ['.js', '.css'];

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('script[src], link[rel="stylesheet"]').forEach(el => {
      const attr = el.tagName === 'SCRIPT' ? 'src' : 'href';
      let url = el.getAttribute(attr);

      if (
        url &&
        !/^https?:\/\//.test(url) &&
        targets.some(ext => url.includes(ext))
      ) {
        const cleanUrl = url.replace(/([?&])v=[^&]*/i, '').replace(/([?&])$/, '');
        const separator = cleanUrl.includes('?') ? '&' : '?';
        const newUrl = `${cleanUrl}${separator}v=${version}`;
        el.setAttribute(attr, newUrl);
      }
    });
  });
})();

// Preserve hash while redirecting with version query
(function () {
  const version = '2.2.2';
  const hash = window.location.hash || '';

  if (!window.location.search.includes('v=')) {
    const separator = window.location.search ? '&' : '?';
    window.location.replace(
      window.location.pathname + window.location.search + separator + 'v=' + version + hash
    );
  }
})();
