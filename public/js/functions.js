$(document).ready(function(){  
    // alert('application started');  

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

});  


$(function () {

    // Date range picker
    $('#reservationdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });

})

$(function () {
$("#example1").DataTable({
    "responsive": true,
    "autoWidth": false,
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