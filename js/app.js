'use strict';
// *** GLOBALS/WINDOW TO DOM ***

let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

let storeSales = [];

let storeSection = document.getElementById('storeSales');
let tableElem = document.getElementById('cities');
let standForm = document.getElementById('myForm');

console.dir(storeSection);

//  *** define callback ***

function handleSubmit(event){
  event.preventDefault();
  let city = event.target.city.value;
  let minCustomer = event.target.minCust.value;
  let maxCustomer= event.target.maxCust.value;
  let avgCookieSale= event.target.avgCookie.value;

  let newCity = new Store (city,minCustomer, maxCustomer,avgCookieSale);
  newCity.getAvgCustHour();
  newCity.getCookieSales();
  newCity.render();
  standForm.reset();
  tableFooter.textContext = '';
}

// *** ATTACH EVENT LISTENER ***
standForm.addEventListener('submit', handleSubmit);


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
  let cityBody = document.createElement('tbody');
  cityBody.id = 'cityBody';
  tableElem.appendChild(cityBody);

  let cityRow= document.createElement('tr');
  cityBody.appendChild(cityRow);

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
  tdDailyTotal.id= 'tdDailyTotal';
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
  dailyTotal.id= 'dailyTH';
  hoursRow.appendChild(dailyTotal);
}



function tableFooter () {
  let cityFooter = document.createElement ('tfoot');
  cityFooter.id = 'cityFooter';
  tableElem.appendChild(cityFooter);

  let totalRow =  document.createElement ('tr');
  cityFooter.appendChild(totalRow);

  let totalTh = document.createElement ('th');
  totalTh.id ='totalHF';
  totalTh.textContent = 'Totals';
  totalRow.appendChild (totalTh);

  let grandTotal= 0;

  for (let i=0; i<hours.length; i++){
    let hourTotal=0;
    for(let j=0; j<storeSales.length; j++) {
      hourTotal +=storeSales[j].cookiesSoldPerHour[i];
    }
    grandTotal+= hourTotal;
    let hourTotalTd= document.createElement('td');
    hourTotalTd.textContent= hourTotal;
    totalRow.appendChild(hourTotalTd);
  }
  let grandTotalTd = document.createElement ('td');
  grandTotalTd.textContent= grandTotal;
  totalRow.appendChild(grandTotalTd);
}

function renderAll (){
  for (let i = 0; i<storeSales.length; i++){
    storeSales[i].getAvgCustHour();
    storeSales[i].getCookieSales();
    storeSales[i].render();

  }
}
//    ***    OBJECTS USING CONSTRUCTORS   ***

new Store ('Seattle', 23, 65, 6.3);
new Store ('Tokyo', 3, 24, 1.2);
new Store ('Dubai', 11, 38, 3.7);
new Store ('Paris', 20, 38, 2.3);
new Store ('Lima', 2, 16, 4.6);

tableHeader();
renderAll();
tableFooter();
console.log(storeSales);

