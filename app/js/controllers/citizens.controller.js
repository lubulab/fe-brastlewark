/* eslint no-undef: "off" */
(function () {
  angular.module('brastlewark')
    .controller('CitizensController', CitizensController);

  function CitizensController (ApiFactory, jsonData) {
    let vm = this;

    vm.title = 'Citizens of Brastlewark'
    vm.itemsPage = jsonData.itemsPage;
    vm.viewDetails = false;

    ApiFactory.getCitizens()
      .then((response) => {
        vm.success = response.success;
        vm.citizens = response.citizens;
        if (vm.citizens.length > 0) {
          vm.totalPages = response.totalPages;
          vm.imgs = response.imgs;
          vm.newData = ApiFactory.dataPage(vm.citizens, jsonData.pageToShow, vm.totalPages);
        } else {
          vm.explanation = response.explanation;
        }
      })

    vm.changePage = (e, pageNumber) => {
      e.preventDefault();
      vm.newData = ApiFactory.dataPage(vm.citizens, pageNumber, vm.totalPages);
    }

    vm.detailsById = (e, citizenId) => {
      e.preventDefault();
      vm.citizen = vm.citizens.find((element) => element.id === citizenId);
      vm.viewDetails = true;
    }

    vm.hideModal = (e) => {
      e.preventDefault();
      vm.viewDetails = false;
    }

    vm.sortCitizens = () => {
      console.log(vm.orderBy);
      if (vm.orderBy === 'age') vm.citizens.sort((a, b) => a.age - b.age);
      if (vm.orderBy === 'weight') vm.citizens.sort((a, b) => a.weight - b.weight);
      if (vm.orderBy === 'height') vm.citizens.sort((a, b) => a.height - b.height);
      if (vm.orderBy === 'friends') vm.citizens.sort((a, b) => a.friends.length - b.friends.length);
      if (vm.orderBy === 'professions') vm.citizens.sort((a, b) => a.professions.length - b.professions.length);
      if (vm.orderBy === 'name') {
        vm.citizens.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      }
      vm.newData = ApiFactory.dataPage(vm.citizens, jsonData.pageToShow, vm.totalPages);
    }

    vm.filterByName = () => {
      console.log(vm.orderBy);
      if (vm.orderBy === 'age') vm.citizens.sort((a, b) => a.age - b.age);
      if (vm.orderBy === 'weight') vm.citizens.sort((a, b) => a.weight - b.weight);
      if (vm.orderBy === 'height') vm.citizens.sort((a, b) => a.height - b.height);
      if (vm.orderBy === 'friends') vm.citizens.sort((a, b) => a.friends.length - b.friends.length);
      if (vm.orderBy === 'professions') vm.citizens.sort((a, b) => a.professions.length - b.professions.length);
      if (vm.orderBy === 'name') {
        vm.citizens.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      }
      vm.newData = ApiFactory.dataPage(vm.citizens, jsonData.pageToShow, vm.totalPages);
    }    
  }
})();