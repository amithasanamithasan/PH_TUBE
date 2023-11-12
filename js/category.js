const getcategorynbutton = async () => {

const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");

const data = await res.json();
// console.log(data);
const buttondata = data.data;
//  console.log(buttondata);
displaybutton(buttondata);
}


function displaybutton(buttondata) {
//  console.log(buttondata);

// console.log(shortbyview);

const buttonid = document.getElementById('categoryButtons');


buttondata.forEach(buttonadd => {


const Apibutton = document.createElement('button');



Apibutton.innerHTML = ` 
<button onclick="handleShowDetail('${buttonadd.category_id}')" 

class="btn btn-secondary">${buttonadd.category}</button>



`;

buttonid.appendChild(Apibutton);

});
}


const handleShowDetail = async (id) => {
console.log(id);
//  console.log('clicked',id);
const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
const data = await res.json();
//  console.log(data);
const datashow = data.data;

showdataall(datashow);

}



const showdataall = (datashow) => {
//  console.log(datashow);
//  const shortbyview=document.getElementById('descending-order');
//  console.log(shortbyview);


// console.log(datashow);

if (datashow.length == 0) {
const categoryContainer = document.getElementById('category-container');
categoryContainer.innerHTML = '';
const data = document.getElementById('data-not-found');
data.style.display = 'block';
} else {

const data = document.getElementById('data-not-found');
data.style.display = 'none';


const categoryContainer = document.getElementById('category-container');

categoryContainer.innerHTML = '';

datashow.forEach(showdata => {

// console.log(showdata);



// 2 create a div
const showCard = document.createElement('div');
showCard.classList = `card bg-gray-200 mt-6 p-0 shadow-xl`;

// 3: set inner html
showCard.innerHTML = `
<figure><img src="${showdata.thumbnail}"  alt="${showdata.title}" />

</figure>
<p class="bg-black text-white">${showdata.others.posted_date}</p>
<div class="chat chat-start">
<div class="chat-image avatar">
<div class="w-10 rounded-full ">
<img src="${showdata.authors[0].profile_picture}" />
</div>
</div>

<p class="text-xl font-serif w-50 h-14 card-title " >${showdata.title}</p>
<p class="text-1xl font-serif w-24 h-5">${showdata.authors[0].profile_name}</p>
<h1 class=" text-1xl font-serif w-24 h-5">${showdata.others.views}</h1>

</div>

`;
// 4 append child
categoryContainer.appendChild(showCard);


});




}


}

document.getElementById('descending-order').addEventListener('click', async function () {
const des = await fetch("https://openapi.programming-hero.com/api/videos/category/1000");
const data = await des.json();
const desending = data.data;
console.log(desending);
const sorteddata = decending(desending);
console.log(sorteddata);

const categoryContainer = document.getElementById('category-container');
categoryContainer.replaceChildren('');
sorteddata.map((showdata) => {

const showCard = document.createElement('div');
showCard.classList = `card bg-gray-200 mt-6 p-0 shadow-xl`;

// 3: set inner html
showCard.innerHTML = `
<figure><img src="${showdata.thumbnail}"  alt="${showdata.title}" />

</figure>
<p class="bg-black text-white">${showdata.others.posted_date}</p>
<div class="chat chat-start">
<div class="chat-image avatar">
<div class="w-10 rounded-full ">
<img src="${showdata.authors[0].profile_picture}" />
</div>
</div>

<p class="text-xl font-serif w-50 h-14 card-title " >${showdata.title}</p>
<p class="text-1xl font-serif w-24 h-5">${showdata.authors[0].profile_name}</p>
<h1 class=" text-1xl font-serif w-24 h-5">${showdata.others.views}</h1>

</div>

`;
categoryContainer.appendChild(showCard);

})
})


const decending = (descending) => {

let _datas = [...descending]
_datas.sort((a, b) => {
const viewsA = parseFloat(a.others.views);
const viewsB = parseFloat(b.others.views);
return viewsB - viewsA
})
console.log("sorted", _datas);
return _datas;
}





getcategorynbutton();
handleShowDetail('1000');





// showdata.others.sort((a, b)=>{
//   return b.views-a.views;
// })
// console.log(showdata);

