//require node modules
const fs = require('fs');
const path = require('path');

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
}
 
 //get the following ellemts for eact item
 items.forEach(item =>{
//link
const link = path.join(pathname, item);

//icon
let icon;
let stats;
//getting stats of the item
const itemFullStaticPath = path.join(fullStaticPath, item);

try {

  stats =
fs.statSync(itemFullStaticPath);

} catch (err) {
  console.log(`statSync error : ${err}`);
  mainContent = `<div class="alert alert-danger">Internal Server Error</div>`;
  return false;
}

if(stats.isDirectory()){
  icon = '<ion-icon name="folder"></ion-icon>';
    }else if(stats.isFile()){
      icon = '<ion-icon name="document"></ion-icon>';
    }

mainContent +=  `
  <tr>
  <td>${icon}<a href="${link}">${item}</a></td>
  <td>100M </td>
  <td>12/08/2018, 09:00:00 PM</td>
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