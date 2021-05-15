// $(function(){
//     $('[data-toggle="tooltip"]').tooltip();
//     $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
//         $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
//     });
//     $('.side-nav .collapse').on("show.bs.collapse", function() {                        
//         $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
//     });
// })    
$(document).ready(function() {

    var dropContainer = document.getElementById('drop-container');
    dropContainer.ondragover = dropContainer.ondragend = function() {
      return false;
    };
  
    dropContainer.ondrop = function(e) {
      e.preventDefault();
      loadImage(e.dataTransfer.files[0])
    }
  
    $("#browse-button").change(function() {
      loadImage($("#browse-button").prop("files")[0]);
    });
  
    // $('.modal').modal({
    //   dismissible: false,
    //   ready: function(modal, trigger) {
    //     $.ajax({
    //       type: "POST",
    //       url: '/detect/api/',
    //       data: {
    //         'image64': $('#img-card-1').attr('src')
    //       },
    //       dataType: 'text',
    //       success: function(data) {
    //         loadStats(data)
    //       }
    //     }).always(function() {
    //       modal.modal('close');
    //     });
    //   }
    // });
   
    $('#go-back').click(function() {
      $('#img-card-1').removeAttr("src");
      $('#stat-table').html('');
      switchCard(0);
    });
    $('#go-start').click(function() {
      var elem = document.getElementById("img-card-2");
      elem.parentNode.removeChild(elem);
      $('#stat-table').html('');
      switchCard(0);
    });
  
    $('#upload-button').click(function() {
        console.log("id buttommmm los");
    //   $('.modal').modal('open');
        //const input = document.getElementById('image');

        // add event listener
        // input.addEventListener('change', () => {
        //     uploadFile(input.files[0]);
        // });
        try {
            
            let photo = document.getElementById("browse-button").files[0];
            console.log(photo,"=======",typeof(photo))
            let formData = new FormData();
            
            formData.append("image", photo);
            console.log("dta",formData)
            //fetch('http://127.0.0.1:5000/api/working/image-detect', {
            fetch('http://riorocker97.com/api/detect', {
                method: "POST", 
                body: formData
            }).then(response => response.json())
            .then(json => {
              console.log("5555555555 respom",json.image);
              
             // loadStats(json.image)
              let img64 = "data:image/png;base64, "+json.image;
              
              var newChild = '<img src="data:image/png;base64, ' + json.image+'"'+ '/>';
              // document.getElementById("detect-result").body.innerHTML = document.write(newChild); 
              document.getElementById("detect-result").innerHTML = newChild; 
              
            });
            
           }
          catch(err) {
            err.message;
            alert("errorrr")
          }
        
        });
  });
  
  switchCard = function(cardNo) {
    var containers = [".dd-container", ".uf-container", ".dt-container"];
    var visibleContainer = containers[cardNo];
    for (var i = 0; i < containers.length; i++) {
      var oz = (containers[i] === visibleContainer) ? '1' : '0';
      $(containers[i]).animate({
        opacity: oz
      }, {
        duration: 200,
        queue: false,
      }).css("z-index", oz);
    }
  }
  
  loadImage = function(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      $('#img-card-1').attr('src', event.target.result);
    }
    reader.readAsDataURL(file);
    switchCard(1);  
  }
  
  loadStats = function(jsonData) {
    console.log("loadstat",jsonData)
    switchCard(2);
    var data = JSON.parse(jsonData);
    // let buff = new Buffer(jsonData, 'base64');
    // console.log("buff",buff)
    var elem = document.createElement("img");
    elem.setAttribute('class', "card crop");
    elem.setAttribute('id', 'img-card-1');
    elem.src = data['url'];
    console.log("elem4",elem)
    document.getElementById("result-image").appendChild(elem);
  
  }

  

