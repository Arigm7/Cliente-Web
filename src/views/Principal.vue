<template>
    <div>
        <span>{{ msj }} </span>
        <button @click="mensajeReverso">Mensaje reverso</button>
    </div>
</template>

<script>

export default {
    name: "Principal",
    props:{},
    data(){
        return{
            msj:"Hola soy la página principal",
        };
    },
    created(){
        console.log("Creando...")
        if(!this.$session.id() && !this.$session.has("user")){          //ESTO VA PRIMERO
            this.$router.push({name:"login"})
        }
    },
    mounted(){
        console.log("Integrando...")
    },
    computed:{},
    watch:{},
    methods:{
        mensajeReverso(){
            console.log("Hola...:D");
            this.msj = this.msj.split("").reverse().join("");
        },
    },
};
</script>

<style>

</style>

