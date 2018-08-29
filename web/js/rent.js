var urlU = "http://ec2-18-219-43-45.us-east-2.compute.amazonaws.com:8080/rentcarJava/Usuario/";
var urlRd = "http://ec2-18-219-43-45.us-east-2.compute.amazonaws.com:8080/rentcarJava/RentaDetalle/";
var urlV = "http://ec2-18-219-43-45.us-east-2.compute.amazonaws.com:8080/rentcarJava/Vehiculo/";
var urlTp = "http://ec2-18-219-43-45.us-east-2.compute.amazonaws.com:8080/rentcarJava/TipoPago/";
$(document).ready(function () {
    obteUsua();
    obteVehi();
    obteTipoP();
    obteRentas();
});
function obteUsua() {
    $.getJSON(urlU+'json/', function(data) {
        
        $('#user li').remove();
        if(typeof(data.usuario.length)!='undefined')
            var users = data.usuario;
        else
            var users = data;
        $.each(users, function(index, users) {
            $('#user').append('<option value="' + users.codi_usua + '">' + users.nomb_usua +' '+users.apel_usua+ '</option>');
        });
    });
}
function obteVehi() {
    $.getJSON(urlV+'json/', function(data) {
        
        $('#car li').remove();
        if(typeof(data.vehiculo.length)!='undefined')
            var vehi = data.vehiculo;
        else
            var vehi = data;
        $.each(vehi, function(index, vehi) {
            $('#car').append('<option value="' + vehi.codi_vehi + '">' + vehi.codi_vehi + '</option>');
        });
    });
}
function obteTipoP() {
    $.getJSON(urlTp+'json/', function(data) {
        
        $('#pay li').remove();
        if(typeof(data.tipo_Pago.length)!='undefined')
            var tipop = data.tipo_Pago;
        else
            var tipop = data;
        $.each(tipop, function(index, tipop) {
            $('#pay').append('<option value="' + tipop.codi_tipo_pago + '">' + tipop.tipo_pago + '</option>');
        });
    });
}
function obteRentas() {
    $.getJSON(urlRd+'json/', function(data) {
        $('#tablita td').remove();
        if(typeof(data.renta_Detalle.length)!='undefined')
            var rentad = data.renta_Detalle;
        else
            var rentad = data;
        $.each(rentad, function(index, rentad) {
            $('#tablita').append('<tr><td>' + rentad.codi_rent_deta + 
                '</td><td>' + rentad.nomb_usua + 
                '</td><td>' + rentad.codi_vehi + 
                '</td><td>' + rentad.fech_rent + 
                '</td><td>' + rentad.fech_devo + 
                '</td><td>' + rentad.tota_deta +
                '</td><td>' + rentad.nomb_pago +
                '</td><td>' + rentad.esta_rent +
                '</td><td><input type="button" class="btn modal-trigger red white-text" data-target="deleteRenta" onClick="sendDele(' + rentad.codi_rent_deta + ')" value="Eliminar">  <input type="button" class="btn modal-trigger blue white-text" data-target="updateEstado" onClick="sendUpda(' + rentad.codi_rent_deta + ')" value="Estado"</td></tr>');
        });
    });
}
function creaRent(){
    var user = $('#user').val();
    var car = $('#car').val();
    var fechRent = $('#fechRent').val();
    var fechDevo = $('#fechDevo').val();
    var total = $('#total').val();
    var pay = $('#pay').val();

    $.ajax({
        url : urlRd + 'create',
        type : 'POST',
        data : {
            usua:user,
            vehi:car,
            fechRe:fechRent,
            fechDe:fechDevo,
            tipo:pay
        },
        success : function(resp) {
            console.log(resp);
            obteRentas();
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
        }
    });
    obteRentas();
}
function sendUpda(codi_renta){
    $.getJSON(urlRd+'json/'+codi_renta, function(data) {
        if(typeof(data.renta_Detalle.length)!='undefined')
            var rentad = data.renta_Detalle;
        else
            var rentad = data;
        $('#codiUpda').val(codi_renta);
       
        $("#estado").next("label").addClass("active");
        $('#estado').val(rentad.esta_rent);
       
            
    });
}

function updaRent(codigo){
    
    var estado = $('#estado').val();
    

    $.ajax({
        url : urlRd + 'updateEsta',
        type : 'PUT',
        data : {
            codi:codigo,
            esta:estado
        },
        success : function(resp) {
            console.log(resp);
            obteRentas();
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
        }
    });
    
    obteRentas();
}
function sendDele(codi_renta){
    $('#codiDele').val(codi_renta);
}
function deleRent(){
    var codi_rent = $('#codiDele').val();
    $.ajax({
        url : urlRd + "delete/" + codi_rent,
        type : 'DELETE',
        success : function(resp){
            console.log(resp);
            obteRentas();
        },
        error : function(){
            console.log("Al parecer no se ha podido conectar con el servidor");
        }
    });
}
