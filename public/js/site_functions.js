$(document).ready(function(){  
    
    // subscribe form
    $('#subscribe').on('click', function()
    {
        var form_fileds = $('#subscribe_form');
        var email = form_fileds.find('input[name="email"]').val();
        
        $.ajax({
            url:'subscribe',
            method:'post',  
            dataType:'json', 
            data:({'email':email}),  
            success:function(response){  
                if(response.value == true){
                    $('#subscribe_result').text('Subscribed Successfully')
                    $('#subscribe_result').css("color","green")
                }else{
                    console.log(response.errors)
                    $('#subscribe_result').text(response.errors[0].msg)
                    $('#subscribe_result').css("color","red")
                }
            },  
            error:function(response){  
                alert('server error occured')  
            }  
        });
    });

    // contact us form
    $('#contact_us_form').on('click', function()
    {
        var form_fileds = $('#contact_form');
        var name = form_fileds.find('input[name="name"]').val();
        var email = form_fileds.find('input[name="email"]').val();
        var title = form_fileds.find('input[name="title"]').val();
        var message = form_fileds.find('textarea[name="message"]').val();
        
        $.ajax({
            url:'contact_form',
            method:'post',  
            dataType:'json', 
            data:({'name':name, 'email':email, 'title':title,'message':message}),  
            success:function(response){  
                if(response.value == true){
                    $('#contact_form_result').text('We Recived Your Message')
                    $('#contact_form_result').css("color","green")
                }else{
                    console.log(response.errors)
                    $('#contact_form_result').text(response.errors[0].msg)
                    $('#contact_form_result').css("color","red")
                }
            },  
            error:function(response){  
                alert('server error occured')  
            }  
        });
    });

    // nav bar handler 
    $(function(){
        var url = window.location;
        var slug = url.href.split("/").pop()
        $('.main-menu a[href="/' + slug + '"]').parent().addClass('active')
    });

});  