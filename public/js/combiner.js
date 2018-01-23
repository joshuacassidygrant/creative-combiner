//UI

var toggleModule = (module) => {
  console.log(module);
  closeModules(module);
  module.classList.toggle("activated");
}

var closeModules = (exceptFor) => {
  var modules = document.getElementsByClassName("moduleHolder");
  for (var i = 0; i < modules.length; i++){
    if(modules[i] != exceptFor){
      modules[i].classList.remove("activated");
    }
  }
}

var openAddDialogue = (templateName) => {
  closeModules();
  addTemplateComponentForm = document.getElementById("addTemplateComponentForm");
  setFieldValue(addTemplateComponentForm, "templateName", templateName);
  addTemplateComponentForm.classList.toggle("activated");

}

var setFieldValue = (form, key, value) => {
  form.childNodes.forEach((n) => {
    if(n.classList.contains("formGroup")) {
      n.childNodes.forEach((m) => {
        if(m.getAttribute("name") == key) {
          m.setAttribute("value", value);
        }
      })
    }
  })
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
        if(children[i].childNodes[j].nodeName === "INPUT" || children[i].childNodes[j].nodeName === "SELECT") {
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


var resortBy = (sort) => {
  reloadLocationWithNewParam("sort", sort);
}

var reloadLocationWithNewParam = (key, val) => {
  //Splits the query parameters to an array of key-value pairs.
  var params = window.location.search.substr(1).split("&&").map((x) => {
    return x.split("=");
  });

  var paramsString = "?";
  var found = false;

  for (i = 0; i < params.length; i++){
    //Check if this is the param we're modifying. If it is, change its value and
    //set the found flag to true.
    if(params[i][0] === key) {
      params[i][1] = val;
      found = true;
    }

    //If not undefined, concatenate this key value pair to the params string
    if(params[i][1]){
      paramsString += params[i][0] + "=" + params[i][1] + "&&";
    }
  }

  //If found, no need for final &&s. Else, we need to keep the terminal &&s and
  //add the new key value pair to the string.
  if(found){
    paramsString = paramsString.slice(0, -2);
  } else {
    paramsString += key + "=" + val;
  }

  //And awaaay we go.
  var loc = window.location.origin + window.location.pathname + paramsString;
  window.location.assign(loc);
}

//TODO:
var downloadJSONdata = () => {
  //getData
  //makeFile
  //
}

var uploadJSONData = () => {
  //receive data
  //validate
  //parse
}
