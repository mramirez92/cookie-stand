'use strict';
// *** GLOBALS/WINDOW TO DOM ***

let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

let storeSection = document.getElementById('stores');

console.dir(storeSection);



// *** HELPER FUNCTIONS ***

function randomCustomer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// *** OBJECT LITERALS ***

let seattle = {
  city: 'Seattle',
  minCustomer: 23,
  maxCustomer: 65,
  avgCookieSale: 6.3,
  cookiesSoldPerHour: [],
  getAvgCustHour: function () {
    return randomCustomer(23,65);
  },
  getCookieSales: function(){
    for (let i=0; i<hours.length; i++){
      let custThisHour= this.getAvgCustHour();
      this.cookiesSoldPerHour.push(
        Math.floor(custThisHour*this.avgCookieSale));
    }
    console.log(this.cookiesSoldPerHour);
  },
  render: function() {

    let articleElem= document.createElement('article');
    // articleElem.id = `${city}-article`;
    storeSection.appendChild(articleElem);

    let h2Elem = document.createElement('h2');
    h2Elem.textContent = this.city;
    articleElem.appendChild(h2Elem);

    let ulElem = document.createElement('ul');
    articleElem.appendChild(ulElem);

    for (let i=0; i <hours.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
      ulElem.appendChild (liElem);
    }
  }
};


let tokyo =  {
  minCustomer: 3,
  maxCustomer: 24,
  avgCookieSale:1.2,
  custHour: 0,
  getAvgCustHour: function () {
    this.custHour = randomCustomer(3, 24);
  },
};

let dubai = {
  minCustomer: 11,
  maxCustomer: 38,
  avgCookieSale: 3.7,
  custHour:0,
  getAvgCustHour: function() {
    this.custHour = randomCustomer(11, 38);
  },
};

let paris = {
  minCustomer: 20,
  maxCustomer: 38,
  avgCookieSale: 2.3,
  custHour: 0,
  getAvgCustHour: function() {
    this.custHour = randomCustomer(20, 38);
  }
};

let lima =  {
  minCustomer: 2,
  maxCustomer: 16,
  avgCookieSale: 4.6,
  custHour:0,
  getAvgCustHour: function () {
    this.custHour = randomCustomer (2,16);

  }
};

// *** EXECUTABLE CODE ***
randomCustomer();
seattle.getAvgCustHour();
seattle.getCookieSales();
seattle.render();

