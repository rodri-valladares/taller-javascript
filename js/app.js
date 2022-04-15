let cliente = {
    mesa:'',
    hora:'',
    pedido: []
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente(){
    const mesa= document.querySelector('#mesa').value;
    const hora= document.querySelector('#hora').value;
    
    const camposVacios = [mesa,hora].some(campo => campo == '')

    if(camposVacios){
        const existeAlerta = document.querySelector('.invalid-feedback');
        if(!existeAlerta){
            const alerta= document.createElement('DIV');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta)
            setTimeout(()=>{
                alerta.remove();
            }, 3000);
        }
        

    }else{
        cliente = {...cliente,mesa,hora}
        var modalFormulario = document.querySelector('#formulario');
        var modal = bootstrap.Modal.getInstance(modalFormulario);
        modal.hide();

        mostrarSecciones();
        obtenerPlatillos(); 

    }
}

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion=>seccion.classList.remove('d-none'));
}

function obtenerPlatillos(){
    const url = 'http://localhost:4000/platillos/';
    fetch(url)
        .then(respuesta=> respuesta.json())
        .then(resultado=> mostrarPlatillos(resultado))
        .catch(error => console.log(error)) 

}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector('#platillos .contenido')

    platillos.forEach( platillo =>{
        const row = document.createElement('DIV');
        row.classList.add('row', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4', 'py-3');
        nombre.textContent = platillo.nombre; 

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'py-3');
        precio.textContent = `$${platillo.precio}`; 

        row.appendChild(nombre);
        row.appendChild(precio)

        contenido.appendChild(row);
    }
    )
    



}