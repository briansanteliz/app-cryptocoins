const formulario = document.getElementById('formulario')
const moneda = document.getElementById('moneda');
const criptomoneda = document.getElementById('criptomoneda');

//iniciando las clases globalmente, cuando inicia la app se cargara
const api = new API('2eb2be7045eb13917effdf24646ebdf7c20a973094ba43989323033456f04a2c')
const ui = new Interfaz()


formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
   //leyendo valore de los inputs
    const monedaSeleccionada = moneda.options[moneda.selectedIndex].value;
   const critoSeleccionada = criptomoneda.options[criptomoneda.selectedIndex].value;
   //comprobando que no esten vacias 
   if(monedaSeleccionada === '' || critoSeleccionada === ''){
      //arroja una alerta de error
         const mensaje = new Interfaz();
         mensaje.mostrarMensaje('Completa todos los datos','error')
   }else{
       //consulta la api devuelve los datos en una prmoesas
       api.queryData(monedaSeleccionada,critoSeleccionada)
            .then(res=>ui.mostrarResultado(res.RAW, monedaSeleccionada, critoSeleccionada))
    }
});

 