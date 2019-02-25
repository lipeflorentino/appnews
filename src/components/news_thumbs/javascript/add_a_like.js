//function para chamar endpoint que adiciona like
export function addALike(userId) {
            
console.log('chamou addALike!');

const id = userId;
const api_url = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/newsLikes/' + id;    

//chamada para api    
fetch(api_url, { 
  method: 'put'  
})
.then(response => response.json()) // retorna uma promise
.then(result => {                
    console.log('adicionei 1 like!');
    document.getElementById("p-likes").textContent = result.num_likes;
})
.catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
});

}