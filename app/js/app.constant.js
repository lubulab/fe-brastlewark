(function () {
  angular
    .module('brastlewark')
    .constant('jsonData', {
      url: 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json',
      itemsPage: 20,
      linkPagesToShow: 5,
      pageToShow: 1
    })
})();