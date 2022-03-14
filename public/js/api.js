const grid = document.getElementById('grid')


const movies = async()=> { 
    try {
        const res = await fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=3467028a11a20878fb21506a8e70a76b')
        if(res.status == 200) {
            const data = await res.json()
            console.log(data)
            
            const series = data.results 
            console.log(series)

            series.map((serie) => {
                const date = serie.first_air_date
                const serieName = serie.name
                const description = serie.overview
                const poster = serie.poster_path

                grid.innerHTML += ` <div class="grid-item">
                <div class="img">
                    <img src="https://image.tmdb.org/t/p/w500/${poster}" alt="">
                </div>
    
                <div class="show-info">
                    <div class="show-title">
                        <h3>${serieName}</h3>
                    </div>
                    <div class="date">${date}</div>
                </div>
    
                <div class="overview">${description}</div>
            </div>
                
                `

            })




        }else if(respuesta.status === 401){
            console.log('there is an athentication error')
        }else if(respuesta.status === 404){
            console.log('movie info cant be found')
        }else{
            console.log('is been an error check with you API provider')
        }
        
    } catch (error) {
        console.log(error)
    }
}

movies()

