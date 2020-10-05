// alert('application started');  

$('#update_partner').click(function(){  

    var form_fileds = $('#partner_form').serializeArray();

    var form_data = new FormData();
    var files = $('#partner_image')[0].files[0];
    if(files)
        form_data.append('partner_image',files);

    $.each(form_fileds, function(i, field){
        console.log(field.name + ":" + field.value)
        form_data.append(''+field.name,field.value);
      });

   $.ajax({
       url:'update_partner',
       method:'post',  
       dataType:'json', 
       contentType: false,
       processData: false, 
       data:form_data,  
       success:function(response){  
           console.log(response)
       },  
       error:function(response){  
           alert('server error occured')  
       }  
   });
});

$('#update_agent').click(function(){  

    var form_fileds = $('#agent_form').serializeArray();

    var form_data = new FormData();
    var files = $('#agent_image')[0].files[0];
    if(files)
        form_data.append('agent_image',files);

    $.each(form_fileds, function(i, field){
        console.log(field.name + ":" + field.value)
        form_data.append(''+field.name,field.value);
      });

   $.ajax({
       url:'update_agent',
       method:'post',  
       dataType:'json', 
       contentType: false,
       processData: false, 
       data:form_data,  
       success:function(response){  
           console.log(response)
       },  
       error:function(response){  
           alert('server error occured')  
       }  
   });

});

$('#update_property').click(function(){  

    var form_fileds = $('#property_form').serializeArray();

    var form_data = new FormData();
    var files = $('#property_images')[0].files[0];
    if(files)
        form_data.append('property_images',files);

    $.each(form_fileds, function(i, field){
        console.log(field.name + ":" + field.value)
        form_data.append(''+field.name,field.value);
      });

   $.ajax({
       url:'update_property',
       method:'post',  
       dataType:'json', 
       contentType: false,
       processData: false, 
       data:form_data,  
       success:function(response){  
           console.log(response)
       },  
       error:function(response){  
           alert('server error occured')  
       }  
   });

});

$('#example1 #delete_property').on('click', function()
{
    var property_id = $(this).closest('tr').find('td[name ="id"]').text();
    var row = $(this).closest('tr');

    $.ajax({
        url:'delete_property',
        method:'post',  
        dataType:'json', 
        data:({property_id : property_id}),  
        success:function(response){  
            row.remove();
            console.log(row)
        },  
        error:function(response){  
            alert('server error occured')  
        }  
    });
});

$('#example1 #delete_partner').on('click', function()
{
    var partner_id = $(this).closest('tr').find('td[name ="id"]').text();
    var row = $(this).closest('tr');

    $.ajax({
        url:'delete_partner',
        method:'post',  
        dataType:'json', 
        data:({partner_id : partner_id}),  
        success:function(response){  
            row.remove();
        },  
        error:function(response){  
            alert('server error occured')  
        }  
    });
});

$('#example1 #delete_agent').on('click', function()
{
    var agent_id = $(this).closest('tr').find('td[name ="id"]').text();
    var row = $(this).closest('tr');

    $.ajax({
        url:'delete_agent',
        method:'post',  
        dataType:'json', 
        data:({agent_id : agent_id}),  
        success:function(response){  
            row.remove();
        },  
        error:function(response){  
            alert('server error occured')  
        }  
    });
});




$('#mytable .customerIDCell').each(function() {
    alert($(this).html());
});

$(function () {

    // Date range picker
    $('#reservationdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });

})

function preview() {
    frame.src=URL.createObjectURL(event.target.files[0]);
}



$(function () {

    $('#example1 #edit_partner').on('click', function()
    {
        $("#partner_modal #partner_id").val( $(this).closest('tr').find('td[name ="id"]').text() );
        $("#partner_modal #partner_name").val( $(this).closest('tr').find('td[name ="name"]').text() );
        $("#partner_modal #frame").attr("src", 'img/'+$(this).closest('tr').find('td[name ="image"]').text() );
    
        // show Modal
        $('#partner_modal').modal('show');
    });

    $('#example1 #edit_agent').on('click', function()
    {
        $("#agent_modal #agent_id").val( $(this).closest('tr').find('td[name ="id"]').text() );
        $("#agent_modal #agent_name").val( $(this).closest('tr').find('td[name ="name"]').text() );
        $("#agent_modal #facebook").val( $(this).closest('tr').find('td[name ="facebook"]').text() );
        $("#agent_modal #twitter").val( $(this).closest('tr').find('td[name ="twitter"]').text() );
        $("#agent_modal #instagram").val( $(this).closest('tr').find('td[name ="instagram"]').text() );
        $("#agent_modal #phone").val( $(this).closest('tr').find('td[name ="phone"]').text() );
        $("#agent_modal #role").val( $(this).closest('tr').find('td[name ="role"]').text() );
        $("#agent_modal #frame").attr("src", 'img/'+$(this).closest('tr').find('td[name ="image"]').text() );

        // show Modal
        $('#agent_modal').modal('show');

    });


    $('#example1 #edit_property').on('click', function()
    {
        $("#property_modal #property_id").val( $(this).closest('tr').find('td[name ="id"]').text() );
        $("#property_modal #space").val( $(this).closest('tr').find('td[name ="space"]').text() );
        $("#property_modal #rooms").val( $(this).closest('tr').find('td[name ="rooms"]').text() );
        $("#property_modal #bath").val( $(this).closest('tr').find('td[name ="bath"]').text() );
        $("#property_modal #garage").val( $(this).closest('tr').find('td[name ="garage"]').text() );
        $("#property_modal #price").val( $(this).closest('tr').find('td[name ="price"]').text() );
        $("#property_modal #location").val( $(this).closest('tr').find('td[name ="location"]').text() );
        $("#property_modal #description").val( $(this).closest('tr').find('td[name ="description"]').text() );
        $("#property_modal #small_desc").val( $(this).closest('tr').find('td[name ="small_desc"]').text() );
        $("#property_modal #type").val( $(this).closest('tr').find('td[name ="type"]').text() );
        $("#property_modal #amenities").val( $(this).closest('tr').find('td[name ="amenities"]').text() );
        $("#property_modal #built_year").val( $(this).closest('tr').find('td[name ="built_year"]').text() );
        $("#property_modal #furniture_type").val( $(this).closest('tr').find('td[name ="furniture_type"]').text() );

        // show Modal
        $('#property_modal').modal('show');

    });


$("#example1").DataTable({
    "responsive": true,
    "autoWidth": false,
    "columnDefs": [
        {
            "targets": [ 0 ],
            // "visible": false,
        },
    ]
});

$('#example2').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "responsive": true,
});

});