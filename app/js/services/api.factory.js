(function () {
  angular
    .module('brastlewark')
    .factory('ApiFactory', ApiFactory)

  function ApiFactory ($http, jsonData) {
    function getCitizens () {
      return $http.get(jsonData.url)
        .then((response) => {
          let totalPages = parseInt(response.data.Brastlewark.length / jsonData.itemsPage)
            + ((response.data.Brastlewark.length % jsonData.itemsPage) ? 1 : 0);
          let citizens = response.data.Brastlewark;
          if (citizens.length < 1 || !(citizens instanceof Array)) {
            return {citizens: [], explanation: 'No citizen found!'};
          }
          return {totalPages, citizens};
        })

        // Images to be cached
        .then((response) => {
          let imagesToCache = []
          response.citizens.forEach((element) => {
            if (!imagesToCache.includes(element.thumbnail)) {
              imagesToCache.push(element.thumbnail)
            }
          });
          response.imgs = imagesToCache;
          return response;
        })

        // Assign gender. Gender assign randomly
        // Citizens with same photo share gender.
        .then((response) => {
          let arrayGender = new Array(response.imgs.length)
              .fill(0)
              .map((element) => Math.random()).map(element => {
            if (element > 0.5) return 'Female'
            return 'Male'
          })
          let citizens = response.citizens;
          console.log(citizens);
          citizens = citizens.map((element) => {
            console.log(element)
            element['gender'] = arrayGender[response.imgs.indexOf(element.thumbnail)]
            return element
          })
          console.log(citizens);
          response.citizens = citizens;
          return response;
        })
        .catch((error) => {
          return {
            citizens: [],
            explanation: `Server respond with ${error.data}`
          }
        })
    }

    function dataPage (citizens, actualPage, totalPages) {
      actualPage = (isNaN(actualPage) || actualPage < 1) ? 1 : parseInt(actualPage)
      actualPage = (actualPage > totalPages) ? totalPages : actualPage
      let citizensPage = citizens.slice((actualPage - 1) * jsonData.itemsPage, actualPage * jsonData.itemsPage)
      let firstItem = parseInt(actualPage - (jsonData.linkPagesToShow - 1) / 2)
      if (firstItem < 1) firstItem = 1
      if (firstItem + jsonData.linkPagesToShow + 1 > totalPages) firstItem = totalPages - jsonData.linkPagesToShow + 1
      let arrayPage = []
      for (let i = 0; i < jsonData.linkPagesToShow; i++) {
        let page = i + firstItem
        if (page === actualPage) arrayPage.push([page, false])
        else arrayPage.push([page, true])
      }
      let previousPage = (actualPage === 1)
      let nextPage = (actualPage === totalPages)
      return {
        citizensPage,
        previousPage,
        arrayPage,
        nextPage,
        actualPage
      }
    }

    return {getCitizens, dataPage};
  }
})()
