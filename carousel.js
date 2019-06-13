var ref = firebase.database().ref('carousel_image');
var imgurl = [];
var carousel = document.getElementById("tabcontainer_carousel");
var storageRef = firebase.storage().ref();

ref.once('value').then(
    function(snapshot){
        arraytid = [];
        arraytid.push(snapshot.val());
        arraytid.forEach(function(value){
            Object.keys(value).forEach(function(key){
                imgurl.push(value[key]);
            })
            console.log(imgurl.length);
            for(var i = 0 ; i < imgurl.length ; i++){
                document.getElementById("imgr"+i).src = imgurl[i];
            }
        })
    }
)

function uploadImg(id) {
    var fileButton = document.getElementById("fileInput"+id);
    var file = fileButton.files[0];
    firebaseRef = firebase.database().ref();
    var storageRef = firebase.storage().ref('/Carousel/'+file.name);
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', function(snapshot){

    }, function(error){

        window.alert('Upload gambar gagal! Silahkan coba lagi.');

    }, function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            var downURL = downloadURL;
            console.log(downURL);
            var uploads = {};

            switch (id) {
                case 0:
                    uploads = {image1: downURL};
                    break;
                case 1: 
                    uploads = {image2: downURL};
                    break;
                case 2:
                    uploads = {image3: downURL};
                    break;
                case 3:
                    uploads = {image4: downURL};
                    break;
                case 4:
                    uploads = {image5: downURL};
                    break;
            }

            firebaseRef.child('carousel_image')
            .update(uploads);

            fileButton.value = "";
            document.getElementById('submitbtn'+(id+1)).style.visibility = 'hidden';

            window.alert('Gambar berhasil diganti!')
        });
        
    })

}    

setInterval(function() { 
    var fileButton1 = document.getElementById("fileInput0");
    var file1 = fileButton1.files[0];
    if(file1 != null){
        document.getElementById('submitbtn1').style.visibility = "visible";
    }else{
        document.getElementById('submitbtn1').style.visibility = "hidden";
    }
    
    fileButton1.onchange = function(){
        var reader = new FileReader();
        console.log("a");
        

        reader.onload = function(e){
            document.getElementById('imgr0').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    }

    var fileButton2 = document.getElementById("fileInput1");
    var file2 = fileButton2.files[0];
    if(file2 != null){
        document.getElementById('submitbtn2').style.visibility = "visible";
    }else{
        document.getElementById('submitbtn2').style.visibility = "hidden";
    }

    fileButton2.onchange = function(){
        var reader = new FileReader();
        console.log("a");
        

        reader.onload = function(e){
            document.getElementById('imgr1').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    }

    var fileButton3 = document.getElementById("fileInput2");
    var file3 = fileButton3.files[0];
    if(file3 != null){
        document.getElementById('submitbtn3').style.visibility = "visible";
    }else{
        document.getElementById('submitbtn3').style.visibility = "hidden";
    }

    fileButton3.onchange = function(){
        var reader = new FileReader();
        console.log("a");
        

        reader.onload = function(e){
            document.getElementById('imgr2').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    }

    var fileButton4 = document.getElementById("fileInput3");
    var file4 = fileButton4.files[0];
    if(file4 != null){
        document.getElementById('submitbtn4').style.visibility = "visible";
    }else{
        document.getElementById('submitbtn4').style.visibility = "hidden";
    }

    fileButton4.onchange = function(){
        var reader = new FileReader();
        console.log("a");
        

        reader.onload = function(e){
            document.getElementById('imgr3').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    }

    var fileButton5 = document.getElementById("fileInput4");
    var file5 = fileButton5.files[0];
    if(file5 != null){
        document.getElementById('submitbtn5').style.visibility = "visible";
    }else{
        document.getElementById('submitbtn5').style.visibility = "hidden";
    }

    fileButton5.onchange = function(){
        var reader = new FileReader();
        console.log("a");
        

        reader.onload = function(e){
            document.getElementById('imgr4').src = e.target.result;
        }

        reader.readAsDataURL(this.files[0]);
    }

}, 1000);


function removeImg(id){
    firebaseRef = firebase.database().ref();
    var no_image = "https://firebasestorage.googleapis.com/v0/b/bca-merchant-service-apps.appspot.com/o/no-img.png?alt=media&token=398ae4ad-44ef-4a45-9b76-97e6e3fa2f26";

    console.log(id);
    var deletes = {};

    switch (id) {
        case "1":
            deletes = {image1:no_image};
            break;
        case "2":
            deletes = {image2:no_image};
            break;
        case "3":
            deletes = {image3:no_image};
            break;
        case "4":
            deletes = {image4:no_image};
            break;
        case "5":
            deletes = {image5:no_image};
            break;
    }

    firebaseRef.child('carousel_image')
    .update(deletes);

    document.getElementById('imgr'+(id-1)).src = no_image;
}