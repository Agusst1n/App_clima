window.addEventListener('load', ()=>{
    let lon;
    let lat;
    let key = `a17bc84896a41de600a9bb7a06cd2e4d`;

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion =>{
            // console.log(posicion.coords.latitude);

            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            const Url = `https://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=${lat}&lon=${lon}&appid=${key}`

            // console.log(Url);

            fetch(Url)
                .then(res => {return res.json()})
                .then(data => {
                    // console.log(data.main.temp)
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp}°C`;

                    // console.log(data.weather[0].description)
                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();

                    // console.log(data.name)
                    ubicacion.textContent = data.name;

                    // // console.log(data.wind.speed);
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`

                    // console.log(data.weather[0].main)

                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                          iconoAnimado.src='animated/thunder.svg'
                          console.log('TORMENTA');
                          break;
                        case 'Drizzle':
                          iconoAnimado.src='animated/rainy-2.svg'
                          console.log('LLOVIZNA');
                          break;
                        case 'Rain':
                          iconoAnimado.src='animated/rainy-7.svg'
                          console.log('LLUVIA');
                          break;
                        case 'Snow':
                          iconoAnimado.src='animated/snowy-6.svg'
                            console.log('NIEVE');
                          break;                        
                        case 'Clear':
                            iconoAnimado.src='animated/day.svg'
                            console.log('LIMPIO');
                          break;
                        case 'Atmosphere':
                          iconoAnimado.src='animated/weather.svg'
                            console.log('ATMOSFERA');
                            break;  
                        case 'Clouds':
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('NUBES');
                            break;  
                        default:
                          iconoAnimado.src='animated/cloudy-day-1.svg'
                          console.log('por defecto');
                      }
                      cleanUp();

                })
                .catch(error =>{
                    console.log(error)
                })
        })
    }
    
    const cleanUp = ()=>{
        let  contenedor = document.getElementById('contenedor')
        let loader = document.querySelector('.loader')

        loader.style.display = 'none'
        contenedor.style.display = 'flex';
    }
})