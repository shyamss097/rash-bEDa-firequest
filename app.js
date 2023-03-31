const wasteList = document.querySelector('#waste-list');

// create element & render cafe
function renderWaste(doc){
    let li = document.createElement('li');
    let type = document.createElement('span');
    let location = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    type.textContent = doc.data().type;
    location.textContent = doc.data().location;

    li.appendChild(type);
    li.appendChild(location);

    wasteList.appendChild(li);
}


db.collection('waste').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderWaste(doc);
    });
});



const form = document.querySelector('#add-waste-form');
// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('waste').add({
        type: form.type.value,
        location: form.location.value
    });
    form.type.value = '';
    form.location.value = '';
});