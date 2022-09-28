import { del, get, post, put } from "./api.js";

export async function getAllPets() {
  return get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
}
export async function createPet(pet) {
    return post("/data/pets", pet);
  }
  export async function getPetById(id) {
    return get("/data/pets/" + id);
  }
  export async function deletePet(id){
    return del('/data/pets/'+id)
}
export async function updatePet(id,pet){
    return put('/data/pets/'+id,pet)
}
export async function donation(petId){
    return post('/data/donation',{
        petId
    })
}
export async function getDonationByPetId(petId){
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
}
export async function getMyDonationsByPetId(petId,userId){
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
/*
export async function getBookByUser(userId){
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}








*/