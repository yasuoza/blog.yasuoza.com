(function() {
  var GITHUB_PAGES_HOST = 'yasuoza.github.io';
  if (document.location.host === GITHUB_PAGES_HOST) {
    document.location.href = document.location.href.replace(GITHUB_PAGES_HOST, '');
  }
}());
