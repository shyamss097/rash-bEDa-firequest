const wasteList = document.querySelector('#cafe-list');

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
