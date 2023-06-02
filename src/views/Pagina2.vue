<template>
   
  <v-container fluid >                                          
    <!-- PANEL DE BUSQUEDA-->
    <v-row>
        <v-card elevation="24" shaped width="100%" dense class="ml-15 mr-15">
            <v-card-title>Búsqueda</v-card-title>       <!--Titutlo-->
            <v-card-text>                                                   <!--Texto-->
                <v-form ref="formBusqueda" v-model="valid">                <!--Validar el formulario, ref es como el id en html, v-model es para asociar variables-->
                    <v-row>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field 
                            v-model="filtro.numPersonal"
                            label="NumPersonal"
                            type="number"
                            min="0"
                            max="20"
                            required/>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field 
                            v-model="filtro.nombre"
                            label="Nombre"
                            maxlength="30"
                            counter
                            required/>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field 
                            v-model="filtro.apellidoPaterno"
                            label="Apellido Paterno"
                            required/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="#1C4C96" dark small @click="onClickBuscar">
                    <v-icon dark left>mdi-magnify</v-icon>                  <!--SE AGREGO LOS ICON-->
                    Buscar</v-btn>
                <v-btn rounded color="#558B2F" dark small @click="onClickLimpiar">
                    <v-icon dark left>mdi-backspace</v-icon>
                    Limpiar</v-btn>
            </v-card-actions>       <!--Lo del boton-->
        </v-card>
    </v-row>
    <!--SECCION TABLA PRINCIPAL -->
    <v-row align="start" justify="start">                                   <!--SE AGREGO EL LUGAR-->
        <v-col cols="2">
            <v-btn rounded color="#1C4C96" dark small @click="onclickNuevoPersonal" class="ml-15 mr-15">
                    <v-icon dark left>mdi-plus</v-icon>                  
                    Nuevo Personal</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table
                :headers="encabezados"
                :items="datos"
                item-key="idPersonal"
                single-select
                @click:row="onClickFila"
                :items-per-page="5"
                class="ml-15 mr-15"
                dense>

                <template v-slot:item.acciones="{ item }">
                    <v-row >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" @click="onclickEditarPersonal(item)">
                                    <v-icon color="#1C4C96" v-on="on">mdi-pencil-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" @click="onclickEliminarPersonal(item)">
                                    <v-icon color="#D50000" v-on="on">mdi-delete-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar</span>
                        </v-tooltip>
                    </v-row>
                <!--<v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete-outline
                </v-icon>-->
             </template>
             <template v-slot:item.idPersonal="{item}">
                <span class="font-weight-bold blue--text">{{ item.idPersonal }} </span>
            </template>
            </v-data-table>
        </v-col>
    </v-row>
    <!--SECCION DETALLE-->
    <v-row>
    </v-row>
     <!--DIALOGO PARA NUEVO PERSONAL-->
    <v-dialog v-model="dialogoPersonal" persistent max-width="1000" transition="dialog-transition">
        <v-card>
            <v-card-title>Personal</v-card-title>
            <v-card-text>
                <v-form ref="formPersonal" v-model="valid">
                    <v-row align="center" justify="start">
                       <v-col cols="12" md="6" sm="4">  <!--PARA HACERLO RESPON-->
                            <v-text-field v-model="personal.nombre" label="Nombre"></v-text-field>
                       </v-col>
                       <v-col cols="12" md="6" sm="4">  <!--PARA HACERLO RESPON-->
                            <v-text-field v-model="personal.apellidoPaterno" label="Apellido Paterno"></v-text-field>
                       </v-col> 
                       <v-col cols="12" md="6" sm="4">  <!--PARA HACERLO RESPON-->
                            <v-text-field v-model="personal.apellidoMaterno" label="Apellido Materno"></v-text-field>
                       </v-col> 
                       <v-col cols="12" md="6" sm="4">  <!--PARA HACERLO RESPON-->
                            <v-text-field v-model="personal.curp" label="CURP"></v-text-field>
                       </v-col> 
                       <v-col cols="12" md="6" sm="4">  <!--PARA HACERLO RESPON-->
                            <v-text-field v-model="personal.rfc" label="RFC"></v-text-field>
                       </v-col> 
                       <v-col cols="12" md="6" sm="4">
                            <v-select :items="catPaises" label="Pais" item-value="id" item-text="nombre" @change="changePais"></v-select>
                       </v-col> 
                       <v-col cols="12" md="6" sm="4">
                            <v-select :items="catEstados" label="Estados" item-value="id" item-text="nombre" @change="changeEstado"></v-select>
                       </v-col> 
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer> 
               <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="onClickGuardarPersonal">
                    <v-icon left> mdi-check</v-icon>Guardar
                </v-btn>
                <v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold" small @click="onClickCerrarPersonal">
                    <v-icon left> mdi-close</v-icon>Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
import {get, post} from '../api/Requests.js'
export default {
    name: "Página2",
    props:{},
    data(){
        return{
           valid:false,
           dialogoPersonal:false,
           idPersonalSelect:null,
           filtro:{
                numPersonal:null,
                nombre:null,
                apellidoPaterno:null,
            }, 
            encabezados:[
                {
                text: 'Acciones',
                value: 'acciones',
                align: 'start',
                sortable: false,
                windth:100,
                },
                {
                text: 'ID Personal',
                value: 'idPersonal',
                align: 'start',
                sortable: false,
                windth:100,
                },
                {
                text: 'Nombre',
                value: 'nombre',
                align: 'start',
                sortable: false,
                windth:255,
                },
                {
                text: 'Apellido Paterno',
                value: 'apellidoPaterno',
                align: 'start',
                sortable: false,
                windth:255,
                },
                {
                text: 'Apellido Materno',
                value: 'apellidoMaterno',
                align: 'start',
                sortable: false,
                windth:255,
                },
                {
                text: 'CURP',
                value: 'curp',
                align: 'start',
                sortable: false,
                windth:255,
                },
                {
                text: 'RFC',
                value: 'rfc',
                align: 'start',
                sortable: false,
                windth:255,
                },
                {
                text: 'Fecha de Nacimiento',
                value: 'fechaNacimiento',
                align: 'start',
                sortable: false,
                windth:255,
                },
                {
                text: 'Sexo',
                value: 'sexo',
                align: 'start',
                sortable: false,
                windth:255,
                },
            ],
            datos:[
                {
                    idPersonal: 'aaa',
                    nombre:'aa',
                    apellidoPaterno:'aaa',
                    apellidoMaterno:'aaa',
                    curp:'aaa',
                    rfc:'aaa',
                    fechaNacimiento:'aaaa',
                    sexo:'aaaa',
                }
            ],  
            personal:{
                idPersonal:null,
                nombre:null,
                apellidoPaterno:null,
                apellidoMaterno:null,
                curp:null,
                rfc:null,
                fechaNacimiento:null,
                sexo:null,
                calle:null,
                colonia:null,
                numExt:null,
                numInt:null,
                cp:null,
                idPais:null,
                idEntidadFederativa:null,
                idMunicipio:null,
                email:null,
                celular:null,
                idEstadoCivil:null,
                ultimoGradoEstudio:null,
                profecion:null,
                idEstatus:null,
                tiempoCreacion:null,
                tiempoActualizacion:null,
            },  
            catPaises:[
                {id:1,nombre:'Mexico'},
                {id:2,nombre:'Brazil'},
                {id:3,nombre:'Colombia'},
            ],        
            catEstados:[

            ]
        };
    },
    created(){
        if(!this.$session.id() && !this.$session.has("user")){
            this.$router.push({name:"login"})
        }
    },
    mounted(){
        
    },
    computed:{},
    watch:{},
    methods:{
        onclickNuevoPersonal(){
            this.dialogoPersonal=true
        },
        onclickEditarPersonal(item){
            console.log(item),
            this.personal={...item},
            this.dialogoPersonal=true
        },
        onclickEliminarPersonal(item){
            console.log(item)

        },
        onClickBuscar(){
           this.getPersonal();
        },
        onClickLimpiar(){
            this.$refs.formBusqueda.reset()
        },
        onClickGuardarPersonal(){

        },
        onClickCerrarPersonal(){
            this.$refs.formPersonal.reset(),
            this.dialogoPersonal=false
        },
        changePais(value){
            console.log(value);
           /* if (value===1){
                this.catEstados(

                    {id:1,nombre:'M1'},
                    {id:2,nombre:'M2'},
                    {id:3,nombre:'M4'},
                ),
            }
            if (value===2){
                this.catEstados(

                    {id:1,nombre:'B1'},
                    {id:2,nombre:'B2'},
                    {id:3,nombre:'B3'},
                ),
            }*/
        },
        changeEstado(){

        },
        async getPersonal(){
            const response = await get('/usuario/getAllUsers/'+this.filtro.numPersonal);
            if(response.error===true){

                return;
            }else{
                this.datos=response;
            }
        },
        onClickFila(item,row){
            console.log(item)
            console.log(row)
            row.select(true)
            this.idPersonalSelect=item.idPersonal
            this.getInformacionLaboral(this.idPersonalSelect)
        },
        async getInformacionLaboral(idPersonal){

        }
    },
};
</script>

<style>

</style>