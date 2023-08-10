// window.onload = (event) => {
//     doctorcall();
//   };

// function doctorcall(){
//     fetch("./doctor.json")
//     .then((res)=>{
//         return res.json();
//     })
//     .then((datas)=>{
//         const data=datas;
//         console.log(data);
//         return data;

//     })
// }
var nid=0;
el_parent = document.getElementById("patient");
el_child = document.getElementById("doctor");
dateresult=document.getElementById("dateresult")
var $select = $("#patient");
$.getJSON('patient.JSON', function (data) {
    $select.html('');
    for (var i = 0; i < data['patient'].length; i++) {
        el_parent.innerHTML = el_parent.innerHTML + '<option>' + data['patient'][i]['name'] + '</option>';
    }
    el_parent.addEventListener('change', function populate_child(e) {
        itm = e.target.value;
        for (var i = 0; i < data['patient'].length; i++) {
            if (itm === data['patient'][i]['name'])
                var d = data['patient'][i]['dId'];
        }
        console.log(d);
        FindDocName(d);
        
    })
})
var di="";
function FindDocName(d) {

    fetch("./doctor.json")
        .then((res) => {

            return res.json();

        })
        .then((data) => {
            console.log(data.doctor);
            console.log(d);
           
            for (var i = 0; i < data.doctor.length; i++) {
                if (d == data.doctor[i].docId) {
                     di = data.doctor[i].docName;
                     nid=d;
                }
                console.log(di);

            
        }
            console.log(di);
            $("#doctor").val(di);

            // document.querySelector('#doctor').value = di;
            for (var i = 0; i < data.doctor.length; i++) {
                if (d == data.doctor[i].docId)
                    el_child.innerHTML = el_child.innerHTML + '<option value="' + data.doctor[i].docId + '" selected>' + data.doctor[i].docName + '</option>';
                else
                    el_child.innerHTML = el_child.innerHTML + '<option value="' + data.doctor[i].docId + '">' + data.doctor[i].docName + '</option>';
            }
        }
        );
}

function dselect() {
    var d = document.getElementById("doctor");
    var dd = d.options[d.selectedIndex].text;
    console.log(dd);
    findId(dd);
}


function findId(dd) {
    fetch("./doctor.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            for (var i = 0; i < data.doctor.length; i++) {
                if (dd == data.doctor[i].docName) {
                    nid = data.doctor[i].docId;
                    console.log(nid);
                }
            }
        })
}

var dateStore;
function date() {
    console.log(nid);
    dateStore = $("input[type='date']").val()
    console.log(dateStore);
    var cc=[dateStore].toString();

    fetch("./doctor.json")
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
           console.log(nid);
           
            for (var i = 0; i < data.doctor.length-1; i++){
               
                var cd=Object.keys(data.doctor[i].appointments[0]).toString();
               
                //console.log(Object.keys(data.doctor[i].appointments[0]).toString())
                if( nid===data.doctor[i].docId && cc===cd)
                {
                    dateresult.innerHTML="Doctor is available on this date."
                }
              
            }
           
        })
}

function time() {
    var timeStore = $("input[type='time']").val()
    console.log(timeStore);
    fetch("./doctor.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            

            for (var i = 0; i < data.doctor.length; i++) {
                var t=Object.values(data.doctor[i].appointments[0]);
                var tt=t[0][0].intime;
                console.log(tt);
                if(nid==data.doctor[i].docId && timeStore==tt){
                    result=document.getElementById("result");
                    result.innerHTML="Available"
                   
                }
               
                
            }
          
           
        })
}





// result=document.getElementById("result");
// result.innerHTML="available"

