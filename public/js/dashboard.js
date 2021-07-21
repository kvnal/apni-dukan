$('#addItemID').click(()=>{
        console.log("ok");
    $("#modalId").show()
})
$('.carousel').carousel({
    interval: 2500
  })
$('#crossId').click(()=>$("#modalId").hide())

window.onclick = (e)=>{
    if(e.target==$("#modalId"))
        $("#modalId").hide()
}

var cart=[]
function addToCart(id){
    console.log(id);
    cart.push(id)

    $(`#${id}`).removeClass('bg-blue-800')
    $(`#${id}`).addClass('bg-green-500')
    $(`#${id}`).html('Added')
    $(`#${id}`).prop('disabled',true)
}

function checkout(){
    if(cart.length){
    return window.location.href=`/checkout/${cart}`}
        return alert("cart is empty!")
}