


var submitForm = (formId) => {
    var form = document.getElementById(formId);
    event.preventDefault();

    var children = form.childNodes;
    var urlEncodedDataPairs = [];
    //capture all form fields

    for(i = 0; i < children.length; i++){
      if(children[i].value) {
        var encodedPair = encodeURIComponent(children[i].name) + '=' + encodeURIComponent(children[i].value);
      }
      urlEncodedDataPairs.push(encodedPair);
    }

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');


    console.log(urlEncodedData);

    var xhr = new XMLHttpRequest();
    var url = '/addData/';




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

    xhr.send(urlEncodedData);

}
