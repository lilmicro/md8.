import $, { data } from 'jquery';
import sum from './utils/sum/sum';





//const addButton = document.querySelector(".js-add-button");


//const url = 'http://localhost:3004/moods';
//const url = 'http://localhost:3004/moods/1'; //dabus konkretu

//const result: Promise<AxiosResponse<any>> = axios.get<Moods[]>(url: 'http://localhost:3004/moods');

//result.then((res) =>{
//  console.log(res.data)
//})


import axios, { AxiosError, AxiosResponse } from 'axios';

type Moods = {
    id: number;
    url: string;
    name: string;
    descript: string;
    createdDate: string;
    delete: string;
}
let moods : Moods[] = [];

 import { formatDistance, subDays } from 'date-fns'
//const datefns = require("date-fns");
//import { format, compareAsc } from 'date-fns'

const dropmoods = ()=>{
const result = axios.get<Moods[]>(' http://localhost:3004/moods ');
const imageInput = document.querySelector<HTMLInputElement>('.js-upload-input');

 
const wrappers = document.querySelector<HTMLDivElement>(".js-ph-wrapper");
 wrappers.innerHTML = '';


    result.then(({data}) :void =>{
    data.forEach((Moods : Moods) => {
        wrappers.innerHTML += `
        <div class="mood">
        <div class="image">
        <img src="${Moods.url}" width="150" height="150" >
        </div>
         <h1 class= "text1">${Moods.name}</h1>
         <br>
         <h2 class= "text2">${Moods.descript}</h2>
         <button class="js-moods-delete" data-moods-delete="${Moods.id}">delete</button>
        <div class="date">${Moods.createdDate}</div>
         <hr>
         </div>
         ` 
    }); 
   



const moodDelete = document.querySelectorAll<HTMLButtonElement>('.js-moods-delete');
    moodDelete.forEach((moodBtn: HTMLButtonElement) =>{
        moodBtn.addEventListener('click', async () =>{
           const moodsId   = moodBtn.dataset.moodsDelete;
           // const moodsId = parseInt(moodBtn.dataset.id, 10);
        
           if(moodsId){
            axios.delete(`http://localhost:3004/moods/${moodsId}`).then(() =>{
                dropmoods(); 
            })
            }
        }) 
    })
}
)};
 dropmoods();
  




const moodform = document.querySelector('.js-mood-form');

moodform.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    const moodnameInput =  moodform.querySelector<HTMLInputElement>('input[name="mood"]');
    const moodnameInputValue = moodnameInput.value;
   // const descriptInput =  moodform.querySelector<HTMLInputElement>('input[descript="mood"]');
   // const descriptInputValue = descriptInput.value;


    axios.post<Moods>(  'http://localhost:3004/moods', {
        name: moodnameInputValue,
    //   descript : descriptInputValue,
    }).then (() =>{
        moodnameInput.value = '';
     //   descriptInput.value = '';
        dropmoods();
    });

});


/*addButton.addEventListener("click", () =>{
   const postResult = axios.post( 'http://localhost:3004/moods', {
        name : "ph3",
    });
    postResult.then(()=>{
    dropmoods();
});
})*/
