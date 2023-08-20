//require node modules
const fs = require('fs');
const path = require('path');

//require files
const calculateSizeD = require('./calculateSizeD.js');
const calculateSizeF = require('./calculateSizeF.js');

const buildMainContent = (fullStaticPath, pathname) =>{
 let mainContent = '';
 let items;
  //loop thru elements inside a folder
  //name and link
try {
  items = fs.readdirSync(fullStaticPath);
  console.log(items)
} catch (err) {
  console.log(`readdirSync Error: ${err}`);
  return `<div class="alert alert-danger">Internal Server Error</div>`;
}
 
 //get the following ellemts for eact item
 items.forEach(item =>{
  //store item details in an object
  let itemDetails = {};
  //name
  itemDetails.name = item;
//link
const link = path.join(pathname, item);


//getting stats of the item
const itemFullStaticPath = path.join(fullStaticPath, item);

try {

  itemDetails.stats =
fs.statSync(itemFullStaticPath);

} catch (err) {
  console.log(`statSync error : ${err}`);
  mainContent = `<div class="alert alert-danger">Internal Server Error</div>`;
  return false;
}

if(itemDetails.stats.isDirectory()){
  itemDetails.icon = '<ion-icon name="folder"></ion-icon>';
   [itemDetails.size, itemDetails.sizeBytes] = calculateSizeD(itemFullStaticPath); 
}else if(itemDetails.stats.isFile()){
  itemDetails.icon = '<ion-icon name="document"></ion-icon>';
      // [itemDetails.size, itemDetails.sizeBytes] = calculateSizeF(itemFullStaticPath);
    }

   //when was the file last changed? (unix timestamp)

        itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);
        
        console.log(itemDetails.timeStamp);

          //convert timestamp to a date
          itemDetails.date = new Date(itemDetails.timeStamp);
        
          itemDetails.date = itemDetails.date.toLocaleString();
          
          console.log(itemDetails.date);

mainContent +=  `
  <tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
  <td>${ itemDetails.icon}<a href="${link}">${item}</a></td>
  <td>${itemDetails.size}</td>
  <td>${itemDetails.date}</td>
  </tr>`;
 });
 //name
 //icon
 //link to the item
 //size
 //last modified
  
  return mainContent;
};


module.exports = buildMainContent;