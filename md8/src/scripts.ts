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

type mood = {
    id: number;
    url: string;
    name: string;
    name2: string;
    createdDate: string;
}


const dropmoods = ()=>{
const result = axios.get<mood[]>(' http://localhost:3004/moods ');
const imageInput = document.querySelector<HTMLInputElement>('.js-upload-input');
        
const wrappers = document.querySelector<HTMLDivElement>(".js-ph-wrapper");
 wrappers.innerHTML = '';

    result.then(({data}) :void =>{
    data.forEach((moods : mood) => {
        wrappers.innerHTML += `
        <div class="mood">
        <div class="image">
        <img src="${moods.url}" width="150" height="150" >
        </div>
         <h1 class= "text1">${moods.name}</h1>
         <br>
         <h1 class= "text2">${moods.name2}</h1>
         <button class="js-moods-delete" data-moods-id="${moods.id}">delete</button>
         <hr>
         </div>
         ` 
    });



const moodDelete = document.querySelectorAll<HTMLButtonElement>('.js-moods-delete');
    moodDelete.forEach((moodBtn: HTMLButtonElement) =>{
        moodBtn.addEventListener('click', async () =>{
           const moodsId   = moodBtn.dataset;
           // const moodsId = parseInt(moodBtn.dataset.id, 10);
        
          

           if(moodsId){
            axios.delete( 'http://localhost:3004/moods/${moodsId}').then(() =>{
                dropmoods(); 
            })
            }
        }) 
    })
})}
 dropmoods();
  




const moodform = document.querySelector('.js-mood-form');

moodform.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    const moodnameInput =  moodform.querySelector<HTMLInputElement>('input[name="mood"]');
    const moodnameInputValue = moodnameInput.value;
    


    axios.post<mood>( 'http://localhost:3004/moods', {
        name: moodnameInputValue,
    }).then (() =>{
        moodnameInput.value = '';
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
