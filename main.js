var ref = firebase.database().ref('transaction_request_promo');
var arraymid = [];
var arraytid = [];
var arraycon = [];
var imageURLForAdss = [];
var titleForAdss = [];
var descriptionForAdss = [];
var dateStartAdss = [];
var dateEndAdss = [];
var timeStartAdss = [];
var timeEndAdss = [];
var address = [];
var email = [];
var mobilephone = [];
var phone = [];

var mid = [];
var statusChecking = [];
var tid = [];
var imgads = [];

setTimeout(function() {
  $('#lds-facebook').fadeOut('fast');
}, 2000); 

ref.once('value').then(
  function(snapshot) {
    arraymid = [];
    arraytid = [];
    snapshot.forEach(function(childSnapshot) {
      arraymid.push(childSnapshot.key);
      for(var i = 0 ; i < arraymid.length ; i++){
        var button = document.createElement('button');
        var bText = document.createTextNode('User'+arraymid[i]);
        var notif = document.createElement('img');
        
        notif.setAttribute('src', 'notif.png');
        notif.setAttribute('width', '20px');
        notif.setAttribute('height', '20px');
        notif.setAttribute('style', 'float: right; box-shadow: 2px 2px 2px grey; border-radius: 50%')

        button.setAttribute('class', 'tablinks');
        button.setAttribute("onclick", "openUser(event, 'user"+arraymid[i]+"')");
        

      }
      
      button.appendChild(bText);
      button.appendChild(notif);
      tabdiv.appendChild(button);
      childSnapshot.forEach(function(anotherChildSnap){
        arraytid.push(anotherChildSnap.val());
        for(var i = 0; i < arraymid.length ; i++){
          if(anotherChildSnap.val().MID == arraymid[i]){
            titleForAdss.push(anotherChildSnap.val().promotionTitle);
            descriptionForAdss.push(anotherChildSnap.val().description);
            dateStartAdss.push(anotherChildSnap.val().dateStart);
            dateEndAdss.push(anotherChildSnap.val().dateEnd);
            timeStartAdss.push(anotherChildSnap.val().timeStart);
            timeEndAdss.push(anotherChildSnap.val().timeEnd);
            imageURLForAdss.push(anotherChildSnap.val().imageURLForAds);
            address.push(anotherChildSnap.val().address);

            if(anotherChildSnap.val().emailAddress != null){
              email.push(anotherChildSnap.val().emailAddress);
            }
            else{
              email.push("");
            }

            if(anotherChildSnap.val().phoneNumber != null){
              mobilephone.push(anotherChildSnap.val().phoneNumber);
            }
            else{
              mobilephone.push("");
            }

            if(anotherChildSnap.val().officePhoneNumber != null){
              phone.push(anotherChildSnap.val().officePhoneNumber);
            }
            else{
              phone.push("");
            }
          }
        }
      })
    })

    arraytid.forEach(function(value){
      Object.keys(value).forEach(function(key){
        // console.log("key: " + key + " value: " + value[key]);
        if(key == "MID"){
          mid.push(value[key]);          
        }

        if(key == "statusChecking"){
          statusChecking.push(value[key]);
        }

        if(key == "TID"){
          tid.push(value[key]);
        }

        if(key == "imageURLForAds"){
          imgads.push(value[key]);
        }
      })
    })
    makecontent();
  } 
)

function openUser(evt, userName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    tabdefault = document.getElementsByClassName("back");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    // document.getElementsByClassName(userName).style.display = "block";
    var un = document.getElementsByClassName(userName);
    for(var i = 0 ; i < un.length ; i++){
      un[i].style.display = "block";
    }
    
    evt.currentTarget.className += " active";
} 

function makecontent(){
  for(var i = 0 ; i < arraytid.length ; i++){
    var tabcon = document.createElement('div');
    var div = document.createElement('div');
    var div2 = document.createElement('div');
    var tabchild1 = document.createElement('div');
    var tabchild2 = document.createElement('div');
    var tabchild3 = document.createElement('div');
    var imgpromo = document.createElement('img');
    var adcontent = document.createElement('div');
    var accbtn = document.createElement('button');
    var declinebtn = document.createElement('button');

    var accText = document.createTextNode('Accept');
    var declineText = document.createTextNode('Decline');
    var statusText = document.createElement('div');
    var status = document.createElement('div');

    status.setAttribute('id', 'status'+tid[i]);
    statusText.setAttribute('style', 'font-size: 26px');
    statusText.innerHTML = "<b>Status : </b><br>";

    if(statusChecking[i] == "accepted"){
      status.setAttribute('style', 'font-size: 36px; margin-top: 10px; color: lightgreen');
      status.innerHTML = "<b>Diterima</b><br>";
      accbtn.setAttribute('style', 'display: none');
      declinebtn.setAttribute('style', 'display: none');
    }else if(statusChecking[i] == "not-accepted"){
      status.setAttribute('style', 'font-size: 36px; margin-top: 10px; color: red');
      status.innerHTML = "<b>Ditolak</b><br>";
      accbtn.setAttribute('style', 'display: none');
      declinebtn.setAttribute('style', 'display: none');
    }else{
      status.setAttribute('style', 'font-size: 36px; margin-top: 10px');
      status.innerHTML = "<b>Waiting</b><br>";
    }

    tabchild1.setAttribute('class', 'tabchild');
    tabchild2.setAttribute('class', 'tabchild');
    tabchild3.setAttribute('class', 'tabchild');
    imgpromo.setAttribute('id', 'imgpromo'+mid[i]);
    imgpromo.setAttribute('alt', '[imageURLForAds]');
    imgpromo.setAttribute('src', imageURLForAdss[i]);
    imgpromo.setAttribute('style', 'width: 100%')
    div2.setAttribute('style', 'text-align: center;')
    tabchild1.appendChild(imgpromo);
    adcontent.setAttribute('id', 'adcontent');
    adcontent.setAttribute('style', 'text-align: center');
    // adcontent.appendChild(adText);
    tabchild2.appendChild(adcontent);

    accbtn.setAttribute('id', 'accbtn'+tid[i]);
    declinebtn.setAttribute('id', 'declinebtn'+tid[i]);
    accbtn.setAttribute('class', 'contentbtn');
    accbtn.setAttribute('onclick', 'acceptAds('+mid[i]+', "'+tid[i]+'")');
    declinebtn.setAttribute('onclick', 'declineAds('+mid[i]+', "'+tid[i]+'")');
    accbtn.appendChild(accText);
    div2.appendChild(statusText);
    div2.appendChild(status);
    div2.appendChild(accbtn);
    declinebtn.setAttribute('class', 'contentbtn');
    declinebtn.appendChild(declineText);
    
    div2.appendChild(declinebtn);
    tabchild3.appendChild(div2);
    div.appendChild(tabchild1);
    div.appendChild(tabchild2);
    div.appendChild(tabchild3);
    adcontent.innerHTML = '<b>Title :</b><br> ' +titleForAdss[i]+ '<br><b>Description :</b><br> ' +descriptionForAdss[i]+ '<br><b>Address :</b><br> ' +address[i]+ '<br><b>Email Address :</b><br> ' +email[i]+ '<br><b>Mobile Phone Number :</b><br> ' +mobilephone[i]+ '<br><b>Office Phone Number :</b><br> ' +phone[i]+ '<br><b>Date Start :</b><br> ' +dateStartAdss[i]+ '<br><b>Date End :</b><br> ' +dateEndAdss[i]+ '<br><b>Time Start :</b><br> ' +timeStartAdss[i]+ '<br><b>Time End :</b><br> ' +timeEndAdss[i]

    tabcon.setAttribute('id', 'user'+mid[i]);  
    tabcon.setAttribute('class', 'tabcontent user'+mid[i]);
    tabcon.appendChild(div);
    tabcontainer.append(tabcon);

  }

  function loadImgList(){
    var imgcreate = document.createElement('img');
    imgcreate.setAttribute('src', 'refresh-512.png');
    body.appendChild(imgcreate);
  }

  function acceptAds(midd, tidd){
    firebaseRef = firebase.database().ref();
    firebaseRef.child('transaction_request_promo/'+midd+'/'+tidd)
    .update({
      statusChecking:'accepted'
    });
    var stts = document.getElementById('status'+tidd);
    console.log("status"+tidd);
    
    stts.innerHTML = "<b>Diterima</b><br>";
    stts.style.cssText = "color: lightgreen; font-size: 36px; margin-top: 10px";
    
    document.getElementById("accbtn"+tidd).style.display = "none";
    document.getElementById("declinebtn"+tidd).style.display = "none";
  }

  function declineAds(midd, tidd){
    firebaseRef = firebase.database().ref();
    firebaseRef.child('transaction_request_promo/'+midd+'/'+tidd)
    .update({
      statusChecking:'not-accepted'
    });
    var stts = document.getElementById('status'+tidd);
    console.log("status"+tidd);
    
    stts.innerHTML = "<b>Ditolak</b><br>";
    stts.style.cssText = "color: red; font-size: 36px; margin-top: 10px";

    document.getElementById("accbtn"+tidd).style.display = "none";
    document.getElementById("declinebtn"+tidd).style.display = "none";
  }

  // function sendNotif(){
  //   // This registration token comes from the client FCM SDKs.
  //   var registrationToken = 'eHWbHQcI06w:APA91bF3a9mgXznfnq2q4DAeFBZ6Gtds15iF9Dp2OJDSPhzMYGURvT7TTrLQaCNyZukOnlioAOtT2AltdpTeBY9lZTB2xiJv2thrxANaZcgcXmBHasXEs43dWzhnB_50aLIfSGGDkXIc';

  //   var message = {
  //     data: {
  //       score: '850',
  //       time: '2:45'
  //     },
  //     token: registrationToken
  //   };
    
  //   // Send a message to the device corresponding to the provided
  //   // registration token.
  //   admin.messaging().send(message)
  //     .then((response) => {
  //       // Response is a message ID string.
  //       console.log('Successfully sent message:', response);
  //     })
  //     .catch((error) => {
  //       console.log('Error sending message:', error);
  //   });
  // }
}
