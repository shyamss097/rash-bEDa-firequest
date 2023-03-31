const wasteList = document.querySelector('#waste-list');

// create element & render cafe
function renderWaste(doc){
    let li = document.createElement('li');
    let type = document.createElement('span');
    let location = document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id', doc.id);
    type.textContent = doc.data().type;
    location.textContent = doc.data().location;
    cross.textContent = 'x';


    li.appendChild(type);
    li.appendChild(location);
    li.appendChild(cross);

    wasteList.appendChild(li);
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('waste').doc(id).delete();
    });
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



// real-time listener
db.collection('waste').orderBy('type').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderWaste(change.doc);
        } else if (change.type == 'removed'){
            let li = wasteList.querySelector('[data-id=' + change.doc.id + ']');
            wasteList.removeChild(li);
        }
    });
});