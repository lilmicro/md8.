import $ from 'jquery';
import sum from './utils/sum/sum';


import axios, { AxiosResponse } from 'axios';

const addButton = document.querySelector(".js-add-*^*");
const wrappers = document.querySelector(".js-ph-wrapper");
type Moods = {
    id: number;
    name: string;
}
//const url = 'http://localhost:3004/moods';
const url = 'http://localhost:3004/moods/1'; //dabus konkretu

const result: Promise<AxiosResponse<any>> = axios.get<Moods[]>(url 'http://localhost:3004/moods');


result.then(({data}) :void =>{
    data.forEach((moods : Moods) => {
        wrappers.innerHTML = 
         <h1>moods</h1>;
    });
})

addButton.addEventListener("click", () =>{
    axios.post( 'http://localhost:3004/moods', {
        name : "ph3",
    });
})