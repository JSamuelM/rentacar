var urlU = "http://ec2-18-219-43-45.us-east-2.compute.amazonaws.com:8080/rentcarJava/Usuario/";
var urlTU = "http://ec2-18-219-43-45.us-east-2.compute.amazonaws.com:8080/rentcarJava/TipoUsuario/";
$(document).ready(function() {
    obteUsua();
    obteTipo();
    $('select').formSelect();
});

function obteTipo() {
    $.getJSON(urlTU+'json/', function(data) {
        var tiposUsuario = data.tipo_Usuario;
        $('#tipoUsua li').remove();
        $('#tipoUsuaUpda li').remove();
        $.each(tiposUsuario, function(index, tipo) {
            $('#tipoUsua').append('<option value="' + tipo.codi_tipo + '">' + tipo.tipo_usua + '</option>');
            $('#tipoUsuaUpda').append('<option value="' + tipo.codi_tipo + '">' + tipo.tipo_usua + '</option>');
        });
    });
}
function obteUsua() {
    $.getJSON(urlU+'json/', function(data) {
        var usuarios = data.usuario;
        $.each(usuarios, function(index, user) {
            $('#tablita').append('<tr><td>' + user.codi_usua + 
                '</td><td>' + user.nomb_usua + 
                '</td><td>' + user.apel_usua + 
                '</td><td>' + user.dui_usua + 
                '</td><td>' + user.corr_usua + 
                '</td><td>' + user.nomb_tipo + 
                '</td><td><input type="button" class="btn modal-trigger red white-text" data-target="deleteUser" onClick="sendDele(' + user.codi_usua + ')" value="Eliminar"> <input type="button" class="btn modal-trigger blue white-text" data-target="updateUser" onClick="sendUpda(' + user.codi_usua + ')" value="Consultar"></td></tr>');
        });
    });
}
function sendDele(codi_usua){
    $('#codiDele').val(codi_usua);
}
function sendUpda(codi_usua){
    $.getJSON(urlU+'json/'+codi_usua, function(data) {
        var usuarios = data.usuario;
            $('#codiUpda').val(codi_usua);
            $("#firstnameUpda").next("label").addClass("active");
            $('#firstnameUpda').val(usuarios.nomb_usua);
            $("#lastnameUpda").next("label").addClass("active");
            $('#lastnameUpda').val(usuarios.apel_usua);
            $("#direcUpda").next("label").addClass("active");
            $('#direcUpda').val(usuarios.dire_usua);
            $("#phoneUpda").next("label").addClass("active");
            $('#phoneUpda').val(usuarios.tele_usua);
            $("#duiUpda").next("label").addClass("active");
            $('#duiUpda').val(usuarios.dui_usua);
            $("#nitUpda").next("label").addClass("active");
            $('#nitUpda').val(usuarios.nit_usua);
            $("#pasaUpda").next("label").addClass("active");
            $('#pasaUpda').val(usuarios.pasa_usua);
            $("#emailUpda").next("label").addClass("active");
            $('#emailUpda').val(usuarios.corr_usua);
            $('#tipoUsuaUpda').val(usuarios.codi_tipo);
            $('#tipoUsuaUpda').change();
    });
}
function deleUsua(){
    var codi_usua = $('#codiDele').val();
    $.ajax({
        url : urlU + "delete/" + codi_usua,
        type : 'DELETE',
        success : function(resp){
            console.log(resp);
            obtenerData();
        },
        error : function(){
            console.log("Al parecer no se ha podido conectar con el servidor");
        }
    });
}
function creaUsua(){
    var nomb = $('#firstname').val();
    var apel = $('#lastname').val();
    var dire = $('#direc').val();
    var tele = $('#phone').val();
    var dui = $('#dui').val();
    var nit = $('#nit').val();
    var pasa = $('#pasa').val();
    var mail = $('#email').val();
    var pass = $('#pass').val();
    var tipo = $('#tipoUsua').val();
    $.ajax({
        url : urlU + 'create',
        type : 'POST',
        data : {
            nomb_usua : nomb,
            apel_usua : apel,
            dire_usua : dire,
            tele_usua : tele,
            dui_usua : dui,
            nit_usua : nit,
            pasa_usua : pasa,
            corr_usua : mail,
            codi_tipo : tipo,
            cont_usua : pass
        },
        success : function(resp) {
            console.log(resp);
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
        }
    });
}

function updaUsua(){
    var codi = $('#codiUpda').val();
    var nomb = $('#firstnameUpda').val();
    var apel = $('#lastnameUpda').val();
    var dire = $('#direcUpda').val();
    var tele = $('#phoneUpda').val();
    var dui = $('#duiUpda').val();
    var nit = $('#nitUpda').val();
    var pasa = $('#pasaUpda').val();
    var mail = $('#emailUpda').val();
    var pass = $('#passUpda').val();
    var tipo = $('#tipoUsuaUpda').val();
    $.ajax({
        url : urlU + 'update',
        type : 'PUT',
        data : {
            codi_usua : codi,
            nomb_usua : nomb,
            apel_usua : apel,
            dire_usua : dire,
            tele_usua : tele,
            dui_usua : dui,
            nit_usua : nit,
            pasa_usua : pasa,
            corr_usua : mail,
            codi_tipo : tipo,
            cont_usua : pass
        },
        success : function(resp) {
            console.log(resp);
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
        }
    });
}