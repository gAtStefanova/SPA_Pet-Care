import {
  deletePet,
  donation,
  getDonationByPetId,
  getMyDonationsByPetId,
  getPetById,
} from "../api/pets.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  pet,
  isOwner,
  onDelete,
  donations,
  showDonationBtn,
  onDonate
) => html`
 <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="./images/Shiba-Inu.png">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donations ? html`${donations}00$`:'0$'}</h4>
                    </div>
                    ${
                      isOwner
                        ? html`<div class="actionBtn"></div>
                            <a href="/edit/${pet._id}" class="edit">Edit</a>
                            <a
                              href="javascript:void(0)"
                              @click=${onDelete}
                              class="remove"
                              >Delete</a
                            >`
                        : ""
                    }
                         
                        ${
                          showDonationBtn
                            ? html`<a
                                @click=${onDonate}
                                class="donate"
                                href="javascript:void(0)"
                                >Donate</a
                              >`
                            : ""
                        }
                        
                    </div>
                </div>
            </div>
        </section>`;

export async function detailsView(ctx) {
  // const pet=await ;
  const userData = getUserData();
  const [pet, donations, hasDonated] = await Promise.all([
    getPetById(ctx.params.id),
    getDonationByPetId(ctx.params.id),
    userData ? getMyDonationsByPetId(ctx.params.id, userData.id) : 0,
  ]);
  const isOwner = userData && userData.id == pet._ownerId;

  const showDonationBtn =
    userData != null && isOwner == false && hasDonated == false;

  ctx.render(
    detailsTemplate(
      pet,
      isOwner,
      onDelete,
      donations,
      showDonationBtn,
      onDonate
    )
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this pet?");

    if (choice) {
      await deletePet(ctx.params.id);
      ctx.page.redirect("/");
    }
  }
  async function onDonate() {
    await donation(ctx.params.id);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
