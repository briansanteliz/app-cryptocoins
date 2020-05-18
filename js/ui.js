
const row = document.querySelector('.row')
const select = document.getElementById('criptomoneda')
const resultado = document.getElementById('resultado');
///instancea la clase
class Interfaz{

  constructor(){
    this.init();
  }
  init(){
    this.construirOptions();
  }
    construirOptions(){
  //instanceando el metodo de api para obtener los datos
    api.getData()
        .then(res=>{
          //PROBRAR CON FOREACH
          Object.entries(res.Data).forEach(res=>{
             const respuesta = res[1]
             const opciones = document.createElement('option')
             opciones.value = respuesta.Symbol
             opciones.textContent = respuesta.CoinName;
             select.appendChild(opciones);
          })
          
          //convirtiendo el objeto a un arreglo e iterando el value
          // for(const [key,value]of Object.entries(res.Data)){
          //   //creando un option en el selcted e it
          //   const opciones = document.createElement('option');
          //   opciones.value = value.Symbol;
          //   opciones.textContent = value.CoinName;
          //   select.appendChild(opciones);
          // }
        })
    }
    mostrarMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
      if(tipo === 'error'){
        divMensaje.classList.add('alert', 'alert-danger', 'text-center');  
        divMensaje.textContent = `${mensaje}`
      }
        const contenedorMensaje = document.querySelector('.mensajes');
        // contenedorMensaje.appendChild(divMensaje);
        row.insertBefore(divMensaje,formulario)
        this.LimpiarMensaje()
    }
    LimpiarMensaje(){
      setTimeout(()=>{
        row.querySelector('div').remove()
     },3000)
    }
    //imprimie el resultado de la cotizacion
    mostrarResultado(respuesta,moneda,criptomoneda){
      
      const divResultado = document.querySelector('#resultado div');
      
      if(divResultado){
        divResultado.remove()
      }
      
      //se le pasa la propiedades entre [] para que use las que se envia en el value del form; la notacion de ".", no funciona
      const respuestaQuery =  respuesta[criptomoneda][moneda]//PROBAR ESTA SINTAXIS IMPORTANTE


      let {FROMSYMBOL, TOSYMBOL, PRICE, CHANGEPCTDAY, LASTUPDATE} = respuestaQuery;
      
        PRICE = PRICE.toFixed(2);
        CHANGEPCTDAY = CHANGEPCTDAY.toFixed(2);
        LASTUPDATE = new Date(LASTUPDATE * 1000).toLocaleDateString('es-VE')
      //construyendo el Template
      let html = `
        <div class="card bg-success">
          <div class="card-body text-light">
              <h2 class="card-tittle">Resultado:</h2>
              <p>El precio de: ${FROMSYMBOL} a moneda: ${TOSYMBOL}
              es de: $ ${PRICE}
              </p>
              <p>
                Su ultima variación fue de: % ${CHANGEPCTDAY}
              </p>
              <p>
                Su ultima actualización fue: ${LASTUPDATE}
              </p>
          </div>
        </div>
      `;
      
      this.mostratSpinner('block')
      setTimeout(()=>{
        // spinner.style.display='none';
        resultado.innerHTML = html;
        this.mostratSpinner('none')
        
      },3000)
      
      
    }
    mostratSpinner(state){
      const spinner = document.querySelector('.contenido-spinner');
      spinner.style.display= state;
      
    }
}