
const dogs = {
  "Corgi": "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};

function dogLinkCreator(dogs) {
  let dogLinks = [];
  Object.keys(dogs).forEach(dog => {
    let a = document.createElement("a");
    a.innerHTML = dog;
    a.href = dogs[dog];
    let li = document.createElement("li");
    li.classList.add("dog-link");
    li.appendChild(a);
    dogLinks.push(li);
  });
  return dogLinks;
}

function attachDogLinks(){
  let dogLinks = dogLinkCreator(dogs);
  let ul = document.querySelector('.drop-down-dog-list')
  dogLinks.forEach(li => {
    ul.appendChild(li);
  });
}

attachDogLinks();