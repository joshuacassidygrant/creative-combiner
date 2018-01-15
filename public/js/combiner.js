//UI

var toggleModule = (module) => {
  var modules = document.getElementsByClassName("moduleHolder");
  for (var i = 0; i < modules.length; i++){
    if(modules[i] != module){
      modules[i].classList.remove("activated");
    }
  }
  module.classList.toggle("activated");
}



//DATA

var submitForm = (formId, url) => {
    var urlEncodedDataPairs = getFormData(formId);
    console.log(urlEncodedDataPairs);
    var urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    sendPostData(urlEncodedData, url);
}

//REQUIRES: a valid form id
//Returns an array of string data pairs in the form key=value
var getFormData = (formId) => {
  var form = document.getElementById(formId);
  event.preventDefault();

  var children = form.childNodes;
  var urlEncodedDataPairs = [];
  var node;
  //Capture all form fields

  for(i = 0; i < children.length; i++){
    if(children[i].classList && children[i].classList.contains('formGroup')){
      for(j = 0; j < children[i].childNodes.length; j++){
        if(children[i].childNodes[j].nodeName === "INPUT") {
          node = children[i].childNodes[j]
        }
      }
    }

    if(node && node.value){
      var encodedPair = encodeURIComponent(node.name) + '=' + encodeURIComponent(node.value);
      urlEncodedDataPairs.push(encodedPair);
    } else {
      console.log("No value found for node " + node);
    }
  }

  return urlEncodedDataPairs;
}

//REQUIRES: valid, url-encoded data string and valid URL.
//Sends post data to given URL;
var sendPostData = (data, url) => {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
  if (xhr.status === 200) {
      console.log("Success");
  }
  else if (xhr.status !== 200) {
      alert('Request failed.  Returned status of ' + xhr.status);
      }
  };

  xhr.send(data);
}
