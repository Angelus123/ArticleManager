$(document).ready(()=>{
    $('.delete-article').on('click', (e) => {
        $target = $(e.target);
      console.log($target.attr('data-id'));
     const id = $target.attr('data-id');
    //  const id = prompt('Enter id now');
      $.ajax({
          type:'delete',
          url:'/articles/'+id,
          success: function(response){
           alert('article deleted successfully');
              window.location.href='/'
          },
          error: function(err){
              console.log(err);
          }
      })
    })
})