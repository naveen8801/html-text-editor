let compile = document.getElementById('btn');
let output = document.getElementById('output');
let code = document.getElementById('code');
let lang = document.getElementById('lang');

compile.addEventListener('click', function () {
  sendFirstRequest();
});

function sendFirstRequest() {
  let codeId = '';
  let data = new Object();
  data.code = code.value;
  data.langId = lang.value;
  let xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'https://codequotient.com/api/executeCode', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.addEventListener('load', function () {
    output.innerHTML = 'Loading';
    let res = JSON.parse(xhttp.responseText);
    codeId = res.codeId;
  });
  xhttp.send(JSON.stringify(data));
  setTimeout(function () {
    sendSecondRequest(codeId);
  }, 10000);
}

function sendSecondRequest(codeId) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://codequotient.com/api/codeResult/' + codeId, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.addEventListener('load', function () {
    let res = JSON.parse(xhttp.responseText);
    output.innerHTML = JSON.parse(res.data).output;
  });
  xhttp.send();
}
