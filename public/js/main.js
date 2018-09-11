window.addEventListener('load',start);
var database,button,fname,femail;
function start(){
    console.log("ISNIDE");
database = firebase.database();
button = document.querySelector('.sub');
button.addEventListener('click',addData);
}

function addData(){
    fname=document.querySelector('.name').value;
femail = document.querySelector('.email').value;
if(!fname || !femail){
    alert("It cant be empty");
    return;
}
database.ref('users/'+fname).once('value',(data)=>{
    if(data.val()!=null || data.val()!=undefined){
        alert("username with same name exists");
        document.querySelector('.name').value='';
        document.querySelector('.email').value='';
        return;
    }
    else{
        database.ref('users/'+fname).set({email:femail});
        database.ref('userInformation/'+fname).set({email:femail});
        fetch('/mail',{
            method:"POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body:JSON.stringify({"name":fname,"email":femail})
        }).then(response=>{
            response.json().then(data=>{console.log("DONE")}).catch(err=>{console.log("Couldn't send")})
        }).catch(err=>{console.log("Couldn't send")});
    }
})
    
}