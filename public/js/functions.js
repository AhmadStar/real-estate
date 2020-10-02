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
    // $("#partner_modal #image").val( $(this).closest('tr').find('td[name ="image"]').text() );
    $("#partner_modal #frame").attr("src", 'img/'+$(this).closest('tr').find('td[name ="image"]').text() );

    // show Modal
    $('#partner_modal').modal('show');

});

// $('#example1 .tr').each(function() {
//     alert($(this).html());
// });

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