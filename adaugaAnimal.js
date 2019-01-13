var submit = document.getElementById('submitButton');

if(submit)
{
    
  submit.addEventListener("click",function(){
    
    var data = {};
    data.name = document.getElementById("name").value;
    data.surname = document.getElementById("surname").value;
    data.phone = document.getElementById("phone").value;
    data.email = document.getElementById("email").value;
    data.description = document.getElementById("description").value;
    data.imageLink = document.getElementById("image").value;

    var msg = JSON.stringify(data);
    if ( data.name != "" && data.email != "" && data.description != "") {
      var ourRequest = new XMLHttpRequest();
      ourRequest.open("POST",'http://localhost:3000/posts',true);
      ourRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
      ourRequest.send(msg);
      alert("Anunt postat!");
      //location.reload();
    } 
      
    
  });
  
}


var showMessages = document.getElementById("lista");
var msgId = [];
var msgName = [];
var msgEmail = [];
var msgMessage = [];

function afiseazaAnunturi(){
  
        
        var ourRequest1 = new XMLHttpRequest();
        ourRequest1.open('GET','http://localhost:3000/posts');
        ourRequest1.onload = function() {
          var ourData = JSON.parse(ourRequest1.response);
          render(ourData);
          
        }
      ourRequest1.send();
}
function render(data){
  var htmlString = "<h2>Toate postarile:</h2>";

  for ( i = 0; i < data.length; i++){
    htmlString += "<ul><li class ='surname'>Nume: " + data[i].surname + "</li><li class = 'name'>Prenume: " + data[i].name +
     "</li><li class = 'email'>Email: " + data[i].email +"</li><li class = 'phone' >Telefon:"+ data[i].phone + "</li><li><image src='"+data[i].imageLink+ "'>"+
     "</li><li><span><span  class = 'description'>Description: </span>"+ data[i].description + "</span></li></ul>";
    }
	while(showMessages.childElementCount)
	showMessages.removeChild(showMessages.childNodes[0]);
	showMessages.insertAdjacentHTML('beforeend',htmlString);
}

