import $, { data } from 'jquery';
import sum from './utils/sum/sum';








//const url = 'http://localhost:3004/moods';
//const url = 'http://localhost:3004/moods/1'; //dabus konkretu

//const result: Promise<AxiosResponse<any>> = axios.get<Moods[]>(url: 'http://localhost:3004/moods');

//result.then((res) =>{
//  console.log(res.data)
//})
//import axios, { AxiosError, AxiosResponse } from 'axios';


import axios from 'axios';
 import { formatDistanceToNow } from 'date-fns';

type Moods = {
    id: number;
    url: string;
    name: string;
    descript: string;
    createdDate: string;
    delete: string;
}
//import { enUS } from 'date-fns/locale';
//const datefns = require("date-fns");
//import { format, compareAsc } from 'date-fns'

const dropmoods = ()=>{
const result = axios.get<Moods[]>(' http://localhost:3004/moods ');
//const imageInput = document.querySelector<HTMLInputElement>('.js-upload-input');
//const addButton = document.querySelector<HTMLButtonElement>(".js-add-button");
const wrappers = document.querySelector<HTMLDivElement>('.js-ph-wrapper');
 wrappers.innerHTML = '';

result.then(({data}) :void =>{
    data.forEach((mood) => {
        wrappers.innerHTML += `
        <div class="mood">
        <div class="image">
        <img src="https://picsum.photos/300/300" >
        </div>
         <h1 class= "text1">${mood.name}</h1>
         <br>
         <h2 class= "text2">${mood.descript}</h2>
         <button class="js-moods-delete" data-moods-delete="${mood.id}">delete</button>
        <div class="date">${formatDistanceToNow(new Date(), { addSuffix: true })}</div>
         <hr>
         </div>
         ` ;
    }); 
   

const moodDelete = document.querySelectorAll<HTMLButtonElement>('.js-moods-delete');
    moodDelete.forEach((moodBtn: HTMLButtonElement) =>{
        moodBtn.addEventListener('click', async () =>{
           const moodId   = moodBtn.dataset.moodsDelete;
           // const moodsId = parseInt(moodBtn.dataset.id, 10);
        
           if(moodId){
            axios.delete(`http://localhost:3004/moods/${moodId}`).then(() =>{
                dropmoods(); 
            })
            };
        }) ;
    });
})
};
 dropmoods();
  

const moodform = document.querySelector('.js-mood-form');
const moodnameInput =  moodform.querySelector<HTMLInputElement>('input[name="mood"]');
const descriptInput =  moodform.querySelector<HTMLInputElement>('input[name="descript"]');


moodform.addEventListener('submit', (event) =>{
event.preventDefault();

    axios.post<Moods>(  'http://localhost:3004/moods', {
        name: moodnameInput.value,
       descript: descriptInput.value,
    }).then (() =>{
        moodnameInput.value = '';
        descriptInput.value = '';
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
