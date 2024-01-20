const photoContainer = document.getElementById("photo-container");
let page = Math.floor(Math.random() * 100) + 1;

async function getPhoto() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=aBBWjpcNK1yT5UJTBGHYV-ulTL9SSv_UVV8by82_jMU`
    );

    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function loadNextPhoto(page) {
  const photos = await getPhoto();
  console.log(photos);

  const fotoElem = photos[0].urls.small;
  const imgElem = document.createElement("img");
  imgElem.src = fotoElem;
  photoContainer.appendChild(imgElem);

  const nameUser = photos[0].user.first_name;
  const h3Elem = document.createElement("h2");
  h3Elem.textContent = `Имя фотографа: ${nameUser}`;
  photoContainer.appendChild(h3Elem);

  let likesElem = photos[0].likes;
  const pElem = document.createElement("p");
  pElem.textContent = `Лайки: ${likesElem}`;
  photoContainer.appendChild(pElem);

  const btnElem = document.createElement("button");
  btnElem.textContent = `лайк`;
  photoContainer.appendChild(btnElem);

  btnElem.addEventListener("click", () => {
    likesElem = likesElem + 1;
    pElem.textContent = `Лайки: ${likesElem}`;
  });
}

loadNextPhoto(page);
