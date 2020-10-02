$(document).ready(function(){  
    $('.search-btn').click(function(){  
        
        // const $form = $('#search')
        // console.log($form);

    //    $.ajax({
    //        url:'/search',
    //        method:'post',  
    //        dataType:'json',  
    //        data:{'task':task},  
    //        success:function(response){  
    //            if(response.msg=='success'){  
    //            alert('task added successfully');  
    //            getdata();  
    //            $('#task').val('')  
    //            }else{  
    //                alert('some error occurred try again');  
    //            }  
    //        },  
    //        error:function(response){  
    //            alert('server error occured')  
    //        }  
    //    });

    });

    // $('.main-menu li').click(function(e) {
    //     //console.log(e.currentTarget,"//",e.target,"//",this);
    //     e.stopPropagation();
    //     $('.nav li').removeClass('active');
    //     $(this).addClass('active');
    //     console.log('test active')
    //   });

    // nav bar handler 
    $(function(){
        var url = window.location;
        var slug = url.href.split("/").pop()
        // console.log($("[attribute$='/"+'about'+"']").parent())
        console.log(($('.main-menu a[href="/' + slug + '"]').parent().addClass('active')))
    });

});  