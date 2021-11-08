'use script';

const search = async elem => {
    //${elem ? 'q=' + elem : ''}
    return await fetch(`https://pixabay.com/api/?key=24029619-9b062bc34728851c709176b8e${elem ? `&q=${elem}` : ''}&lang=pt&safesearch=true`)
            .then(
                response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        document.body.style.backgroundColor = 'red'
                    }
                }
            )
            .catch(() => {
                document.body.style.backgroundColor = 'black'
            });
}

const genImages = array => {
    return array.map(element => genImage(element));
}

const genImage = object => {
    console.log(object)
    const hold = document.createElement("div");
    

    hold.innerHTML = `
        <div class='comments'>${object.comments} comments</div>
        <div class='likes'>${object.likes} likes</div>
        <div class='tags'></div>
        <a href='${object.pageURL}' style='background-image: url(${object.webformatURL})'>
    `
    hold.style.width = object.webformatWidth + 'px'
    hold.style.height = object.webformatHeight + 'px'
    hold.classList.add("imagens")
    
    const tags = hold.querySelector('.tags')
    object.tags.split(', ').forEach( tag => {
        const temp = document.createElement('div');
        temp.textContent = tag;

        temp.onclick = function(){
            pesquisa.value = tag;
            pesquisa.onchange();
            
        }

        tags.appendChild(temp)
    })

    return hold;
}

const pesquisa = document.getElementById('pesquisa')
const lupa = document.getElementById('lupa')

pesquisa.onchange = function(){
    search(this.value).then( json => {
        const main = document.querySelector('main')
        main.innerHTML = ''
        
        genImages(json.hits).forEach(element => {
            main.append(element)
        });
    })
}

lupa.onclick = () => pesquisa.onchange()

