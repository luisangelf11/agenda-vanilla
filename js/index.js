const $form = document.getElementById('form');
const $agenda = document.getElementById('agenda');
const $template = document.getElementById('template').content;
const $title = document.getElementById('title');
const $frag = document.createDocumentFragment()

const getData = async () => {
    try {
        const res = await fetch(`http://localhost:3000/agenda`);
        if (!res.ok) throw new Error(`Ocurrio un error en la peticion`)
        const json = await res.json()
        json.forEach((el) => {
            $template.querySelector('p').textContent = `${el.name} - ${el.phone}`
            $template.querySelector('#edit').dataset.id = el.id;
            $template.querySelector('#edit').dataset.name = el.name;
            $template.querySelector('#edit').dataset.phone = el.phone;
            $template.querySelector('#delete').dataset.id = el.id;
            $template.querySelector('#delete').dataset.name = el.name;
            let $clone = document.importNode($template, true);
            $frag.appendChild($clone);
        })
        $agenda.appendChild($frag);
    } catch (error) {
        let msj = error.message || "Ocurrio un error inesperado"
        alert(msj)
    }
}

const createData = async (name, phone) => {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                name, phone
            })
        };
        let res = await fetch("http://localhost:3000/agenda", options);

        if (!res.ok) throw new Error(`Ocurrio un error en la peticion`)
        location.reload();
    } catch (error) {
        let msj = error.message || "Ocurrio un error inesperado"
        alert(msj)
    }
}

const updateData = async (id, name, phone) => {
    try {
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                name, phone
            })
        };
        let res = await fetch(`http://localhost:3000/agenda/${id}`, options);

        if (!res.ok) throw new Error(`Ocurrio un error en la peticion`)
        location.reload();
    } catch (error) {
        let msj = error.message || "Ocurrio un error inesperado"
        alert(msj)
    }
}

const deleteData = async(id)=>{
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        };
        let res = await fetch(`http://localhost:3000/agenda/${id}`, options);

        if (!res.ok) throw new Error(`Ocurrio un error en la peticion`)
        location.reload();
    } catch (error) {
        let msj = error.message || "Ocurrio un error inesperado"
        alert(msj)
    }
}

const loadDataInput = (id, name, phone) => {
    $title.textContent = `Editando Contacto`
    $form.name.value = name;
    $form.phone.value = phone;
    $form.id.value = id;
}

document.addEventListener('DOMContentLoaded', getData)

document.addEventListener("submit", (e) => {
    if (e.target === $form) {
        e.preventDefault();
        if (!e.target.id.value)
            createData(e.target.name.value, e.target.phone.value)
        else
            updateData(e.target.id.value, e.target.name.value, e.target.phone.value)
    }
})

document.addEventListener("click", (e) => {
    if (e.target.matches('#edit'))
        loadDataInput(e.target.dataset.id, e.target.dataset.name, e.target.dataset.phone)
    if(e.target.matches('#delete')){
        let answer = confirm(`¿Deseas eliminar a ${e.target.dataset.name} de tus contactos?`)
        if(answer) deleteData(e.target.dataset.id)
    }
})