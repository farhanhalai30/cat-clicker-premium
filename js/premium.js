(function() {
  var model = {
    init: function() {
      this.catsList = [
        { name: "Cat", clickCount: 0 },
        { name: "Larry", clickCount: 0 },
        { name: "Shipper", clickCount: 0 },
        { name: "Buzo", clickCount: 0 }
      ];
      this.selectedCat = 0;
    },
    changeSelected: function(index) {
      this.selectedCat = index;
    },
    increaseClickCount: function(index) {
      this.catsList[index].clickCount++;
    }
  };

  var octopus = {
    init: function() {
      model.init();
      viewList.init();
      viewSelected.init();
    },
    getCatsList: function() {
      return model.catsList;
    },
    getSelectedCat: function() {
      return model.catsList[model.selectedCat];
    },
    setSelectedCat: function(index) {
      model.changeSelected(index);
      viewSelected.render();
    },
    increaseClickCount: function() {
      model.increaseClickCount(model.selectedCat);
      viewSelected.render();
    }
  };

  var getById = function(id) {
    return document.getElementById(id);
  };

  var viewList = {
    init: function() {
      this.catsListView = getById("cats-list");
      this.render();
    },
    render: function() {
      var catsList = octopus.getCatsList();
      for (i = 0; i < catsList.length; i++) {
        var catBtn = document.createElement("button");
        catBtn.textContent = catsList[i].name;

        catBtn.addEventListener(
          "click",
          (function(i) {
            return function() {
              octopus.setSelectedCat(i);
            };
          })(i)
        );
        this.catsListView.append(catBtn);
      }
    }
  };

  var viewSelected = {
    init: function() {
      this.selectedCatView = getById("selected-cat");
      this.selectedCatName = getById("cat-name");
      this.selectedCatClickCount = getById("cat-click-count");
      this.selectedCatName.addEventListener("click", function() {
        octopus.increaseClickCount();
      });
      this.render();
    },
    render: function() {
      var selectedCat = octopus.getSelectedCat();
      this.selectedCatName.innerHTML = selectedCat.name;
      this.selectedCatClickCount.innerHTML = selectedCat.clickCount;
    }
  };

  octopus.init();
})();
