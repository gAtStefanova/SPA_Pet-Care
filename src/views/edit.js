import { getPetById, updatePet } from "../api/pets.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const editTemplate = (pet,onSubmit) => html`<section id="editPage">
<form @submit=${onSubmit} class="editForm">
    <img src="./images/editpage-dog.jpg">
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" .value=${pet.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" .value=${pet.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" .value=${pet.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" .value=${pet.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" .value=${pet.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`;


export async function editView(ctx){
    const pet=await getPetById(ctx.params.id);
    ctx.render(editTemplate(pet,onSubmit));
     async function onSubmit(event){
event.preventDefault();
const formData=new FormData(event.target);
const pet={
    name:formData.get('name'),
    breed:formData.get('breed'),
    age:formData.get('age'),
    weight:formData.get('weight'),
    image:formData.get('image')
  }
  if(pet.name==''||pet.breed==''||pet.age==''||pet.weight==''||pet.image==''){
    return alert('All field are required!')
  }
  await updatePet(ctx.params.id,pet);
  event.target.reset();
  ctx.page.redirect('/details/'+ctx.params.id)

     }

}