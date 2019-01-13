var btnShow = document.getElementById("show");
var messages = document.getElementById("mesaje");
var msgId = [];
var msgEmail = [];
var msgMessage = [];
if(btnShow)
  btnShow.addEventListener("click",function(){
      
    var ourRequest1 = new XMLHttpRequest();
    ourRequest1.open('GET','http://localhost:3000/contact');
    ourRequest1.onload = function() {
    var ourData = JSON.parse(ourRequest1.responseText);
    render(ourData);
    
    
  };
    ourRequest1.send();
    
  });


// var maxId;
function render(data){
  var htmlString = "<h2>All Messages:</h2>";
  msgId = [];
  msgEmail = [];
  msgMessage = [];
  nrElem = 0;
  for ( i = 0; i < data.length; i++){
    htmlString += "<ul><li class='bold'>Message #"+ data[i].id + "</li><li>Email: " + data[i].email +"</li><li><span>Message: "+ data[i].message + "</span></li></ul>";
	  msgId[i] = data[i].id;
    msgEmail[i] = data[i].email;
    msgMessage[i] = data[i].message;
    maxId = msgId[i];
    }
	while(messages.childElementCount)
	messages.removeChild(showMessages.childNodes[0]);
	messages.insertAdjacentHTML('beforeend',htmlString);
}
var deleted = 0;
var btnDelete = document.getElementById("delete");
if(btnDelete)
  btnDelete.addEventListener("click",function(){
    var value = document.getElementById("delete-val").value;
    var i=0;
    var elNumber = 0;
    var emptyString = "";
	  for(i = 0; i < msgId.length; i++)
			if ( msgId[i] == value){
        elNumber = i;
        break;
      }
			if(i == msgId.length + 1){
        alert("Not a valid ID");
				return;
			}
    if(isNaN(value) || value < 1 || value > maxId)
      alert ("Not a valid ID");
    else {
      var answer = confirm("Delete message?");
      if ( answer == true) {
        var ourRequest2 = new XMLHttpRequest();
        ourRequest2.open("DELETE", 'http://localhost:3000/contact/' + value, true);
        ourRequest2.send(null);
        var descriptions = messages.getElementsByTagName('ul');
        descriptions[elNumber].innerHTML = emptyString;
        deleted++;
      }
    }
  });

var btnEdit = document.getElementById("edit");
if(btnEdit)
  btnEdit.addEventListener("click",function(){
    var value = document.getElementById("edit-val").value;
    var i=0;
    var elNumber = 0;
	  for(i = 0; i < msgId.length; i++)
			if ( msgId[i] == value){
        elNumber = i;
        break;
      }
			if(i == msgId.length + 1){
        alert("Not a valid ID");
				return;
			}
    if(isNaN(value) || value < 1 || value > maxId)
      alert ("Not a valid ID");
    else {
      var newMsg = "Message: " + document.getElementById("new-message").value;
      if(newMsg == "") {
        alert("Message can't pe empty!");
        return;
      }
      var answer = confirm("Edit message?");
      if(answer == true){
        var data={};
        var ourRequest3 = new XMLHttpRequest();
        ourRequest3.open("PUT", 'http://localhost:3000/contact/'+ value.toString(), true);
        ourRequest3.setRequestHeader('Content-type','application/json; charset=utf-8');
        data.email = msgEmail[value - 1];
        data.message = newMsg;
        var update = JSON.stringify(data);
        ourRequest3.send(update);
        alert(elNumber);
        var descriptions = messages.getElementsByTagName('span');
        descriptions[elNumber-deleted].innerHTML = newMsg;
      }
    }
  });