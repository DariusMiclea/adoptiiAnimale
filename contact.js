
  var submit = document.getElementById('submitButton');

if(submit)
{

  submit.addEventListener("click",function(){
    var data = {};
    data.email = document.getElementById("email").value;
    data.message = document.getElementById("message").value;

    var msg = JSON.stringify(data);

    //var ans = confirm("Doriti sa trimiteti?");
    
    if (data.email != "" && data.description != "") {
      var ourRequest = new XMLHttpRequest();
      ourRequest.open("POST",'http://localhost:3000/contact',true);
      ourRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
      ourRequest.send(msg);
      alert("Mesaj trimis!")
      //location.reload();
    }
    
  });
  
}


