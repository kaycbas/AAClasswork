
const partyHeader = document.getElementById('party');

export const htmlGenerator = (string, htmlElement) => {
    if (htmlElement.children) {
        Array.from(htmlElement.children).forEach((child) => htmlElement.removeChild(child));
    }
    let p = document.createElement("p");
    p.innerHTML = string;
    htmlElement.appendChild(p);
};

// htmlGenerator('Break Time.', partyHeader);
// htmlGenerator('Hello there.', partyHeader);