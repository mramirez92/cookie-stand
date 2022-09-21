'use strict';
// *** GLOBALS/WINDOW TO DOM ***

let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

let storeSales = [];

let storeSection = document.getElementById('storeSales');
let tableElem = document.getElementById('cities');

console.dir(storeSection);


// *** HELPER FUNCTIONS ***

function randomCustomer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//    ***    CONSTRUCTORS ***

function Store (city, minCustomer, maxCustomer,avgCookieSale){
  this.city = city;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookieSale = avgCookieSale;
  this.cookiesSoldPerHour= [];//ask about this
  this.totalCookiesSales = 0;
  storeSales.push(this);
}
//    ***   PROTOTYPES ***
Store.prototype.getAvgCustHour = function (){
  return randomCustomer(this.minCustomer,this.maxCustomer);
};

Store.prototype.getCookieSales = function (){
  for (let i=0; i<hours.length; i++){
    let custThisHour= this.getAvgCustHour();
    this.cookiesSoldPerHour.push(
      Math.floor(custThisHour*this.avgCookieSale));
    this.totalCookiesSales += this.cookiesSoldPerHour[i];
  }
};

Store.prototype.render= function (){

  let cityRow= document.createElement('tr');
  tableElem.appendChild(cityRow);

  let cityHeader= document.createElement('th');
  cityHeader.textContent= this.city;
  cityRow.appendChild(cityHeader);

  for (let i=0; i <hours.length; i++){
    let tdElem = document.createElement('td');
    tdElem.textContent = this.cookiesSoldPerHour[i];
    cityRow.appendChild (tdElem);

  }

  let tdDailyTotal = document.createElement('td');
  tdDailyTotal.textContent=this.totalCookiesSales;
  cityRow.appendChild(tdDailyTotal);
};


function tableHeader(){
  let hoursHead = document.createElement('thead');
  tableElem.appendChild(hoursHead);

  let hoursRow= document.createElement ('tr');
  hoursHead.appendChild(hoursRow);

  let blankHourHeader= document.createElement('th');
  blankHourHeader.textContent='';
  blankHourHeader.id= 'emptyHeader';
  hoursRow.appendChild(blankHourHeader);

  for (let i=0; i <hours.length; i++){
    let hourHeader = document.createElement('th');
    hourHeader.textContent = hours[i];
    hoursRow.appendChild(hourHeader);
  }

  let dailyTotal = document.createElement('th');
  dailyTotal.textContent = 'Daily Location total';
  hoursRow.appendChild(dailyTotal);
}

function tableBody (){
  let cityBody = document.createElement('tbody');
  cityBody.id = 'cityBody';
  tableElem.appendChild(cityBody);
}

tableHeader();
tableBody();

//    ***    OBJECTS USING CONSTRUCTORS   ***
new Store ('Seattle', 23, 65, 6.3);
new Store ('Tokyo', 3, 24, 1.2);
new Store ('Dubai', 11, 38, 3.7);
new Store ('Paris', 20, 38, 2.3); 
new Store ('Lima', 2, 16, 4.6);

console.log(storeSales);

function renderAll (){
  for (let i = 0; i<storeSales.length; i++){
    storeSales[i].getAvgCustHour();
    storeSales[i].getCookieSales();
    storeSales[i].render();

  }
}

renderAll();


// // *** OBJECT LITERALS ***

// let seattle = {
//   city: 'Seattle',
//   minCustomer: 23,
//   maxCustomer: 65,
//   avgCookieSale: 6.3,
//   cookiesSoldPerHour: [],
//   totalCookiesSales:0,
//   getAvgCustHour: function () {
//     return randomCustomer(23,65);
//   },
//   getCookieSales: function(){
//     for (let i=0; i<hours.length; i++){
//       let custThisHour= this.getAvgCustHour();
//       this.cookiesSoldPerHour.push(
//         Math.floor(custThisHour*this.avgCookieSale));
//       this.totalCookiesSales += this.cookiesSoldPerHour[i];
//     }
//   },

//   renderHeader: function() {

//     let articleElem= document.createElement('article');
//     // articleElem.id = `${city}-article`;
//     articleElem.id= this.city;
//     storeSection.appendChild(articleElem);

//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.city;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i=0; i <hours.length; i++){
//       let tdElem = document.createElement('li');
//       tdElem.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
//       ulElem.appendChild (tdElem);

//     }
//     let tdElem = document.createElement('li');
//     tdElem.textContent = `Total Cookies Sold: ${this.totalCookiesSales}`;
//     ulElem.appendChild (tdElem);
//   }
// };


// let tokyo =  {
//   city: 'Tokyo',
//   minCustomer: 3,
//   maxCustomer: 24,
//   avgCookieSale:1.2,
//   cookiesSoldPerHour: [],
//   totalCookiesSales: 0,
//   getAvgCustHour: function () {
//     return randomCustomer(3, 24);
//   },
//   getCookieSales: function(){
//     for (let i=0; i<hours.length; i++){
//       let custThisHour= this.getAvgCustHour();
//       this.cookiesSoldPerHour.push(
//         Math.floor(custThisHour*this.avgCookieSale));
//       this.totalCookiesSales += this.cookiesSoldPerHour[i];
//     }
//   },

//   renderHeader: function() {

//     let articleElem= document.createElement('article');
//     // articleElem.id = `${city}-article`;
//     articleElem.id= this.city;
//     storeSection.appendChild(articleElem);

//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.city;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i=0; i <hours.length; i++){
//       let tdElem = document.createElement('li');
//       tdElem.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
//       ulElem.appendChild (tdElem);

//     }
//     let tdElem = document.createElement('li');
//     tdElem.textContent = `Total Cookies Sold: ${this.totalCookiesSales}`;
//     ulElem.appendChild (tdElem);
//   }
// };

// let dubai = {
//   city: 'Dubai',
//   minCustomer: 11,
//   maxCustomer: 38,
//   avgCookieSale: 3.7,
//   cookiesSoldPerHour: [],
//   totalCookiesSales:0,
//   getAvgCustHour: function() {
//     return randomCustomer(11, 38);
//   },
//   getCookieSales: function(){
//     for (let i=0; i<hours.length; i++){
//       let custThisHour= this.getAvgCustHour();
//       this.cookiesSoldPerHour.push(
//         Math.floor(custThisHour*this.avgCookieSale));
//       this.totalCookiesSales += this.cookiesSoldPerHour[i];
//     }
//   },

//   renderHeader: function() {

//     let articleElem= document.createElement('article');
//     // articleElem.id = `${city}-article`;
//     articleElem.id= this.city;
//     storeSection.appendChild(articleElem);

//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.city;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i=0; i <hours.length; i++){
//       let tdElem = document.createElement('li');
//       tdElem.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
//       ulElem.appendChild (tdElem);

//     }
//     let tdElem = document.createElement('li');
//     tdElem.textContent = `Total Cookies Sold: ${this.totalCookiesSales}`;
//     ulElem.appendChild (tdElem);
//   }
// };

// let paris = {
//   city: 'Paris',
//   minCustomer: 20,
//   maxCustomer: 38,
//   avgCookieSale: 2.3,
//   cookiesSoldPerHour: [],
//   totalCookiesSales: 0,
//   getAvgCustHour: function() {
//     return randomCustomer(20, 38);
//   },
//   getCookieSales: function(){
//     for (let i=0; i<hours.length; i++){
//       let custThisHour= this.getAvgCustHour();
//       this.cookiesSoldPerHour.push(
//         Math.floor(custThisHour*this.avgCookieSale));
//       this.totalCookiesSales += this.cookiesSoldPerHour[i];
//     }
//   },

//   renderHeader: function() {

//     let articleElem= document.createElement('article');
//     // articleElem.id = `${city}-article`;
//     articleElem.id= this.city;
//     storeSection.appendChild(articleElem);

//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.city;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i=0; i <hours.length; i++){
//       let tdElem = document.createElement('li');
//       tdElem.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
//       ulElem.appendChild (tdElem);

//     }
//     let tdElem = document.createElement('li');
//     tdElem.textContent = `Total Cookies Sold: ${this.totalCookiesSales}`;
//     ulElem.appendChild (tdElem);
//   }
// };

// let lima =  {
//   city: 'Lima',
//   minCustomer: 2,
//   maxCustomer: 16,
//   avgCookieSale: 4.6,
//   cookiesSoldPerHour:[],
//   totalCookiesSales: 0,
//   getAvgCustHour: function () {
//     return randomCustomer (2,16);
//   },
//   getCookieSales: function (){
//     for(let i= 0; i<hours.length; i++){
//       let custThisHour = this.getAvgCustHour();
//       this.cookiesSoldPerHour.push(
//         Math.floor(custThisHour*this.avgCookieSale));
//       this.totalCookiesSales += this.cookiesSoldPerHour[i];
//     }
//   },
//   renderHeader: function (){

//     let articleElem = document.createElement('article');
//     articleElem.id= this.city;
//     storeSection.appendChild(articleElem);

//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.city;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);
//     ulElem.id = `${this.city}-list`;

//     for (let i=0; i<hours.length; i++){
//       let tdElem= document.createElement('li');
//       tdElem.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
//       ulElem.appendChild(tdElem);
//     }
//     let tdElem = document.createElement('li');
//     tdElem.textContent = `Total Cookies Sold: ${this.totalCookiesSales}`;
//     ulElem.appendChild (tdElem);
//   }
// };

// // *** EXECUTABLE CODE ***
// randomCustomer();
// seattle.getAvgCustHour();
// seattle.getCookieSales();
// seattle.renderHeader();

// tokyo.getAvgCustHour();
// tokyo.getCookieSales();
// tokyo.renderHeader();

// dubai.getAvgCustHour();
// dubai.getCookieSales();
// dubai.renderHeader();

// paris.getAvgCustHour();
// paris.getCookieSales();
// paris.renderHeader();

// lima.getAvgCustHour();
// lima.getCookieSales();
// lima.renderHeader();

