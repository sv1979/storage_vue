<template>
    <div id="app">
        <IntroForm @save_user_to_db="saveUserToDb" />
        <AppInside @save_user_data_to_db="saveUserDataToDb" />
    </div>
</template>

<script>

    import IntroForm from './components/IntroForm'
    import AppInside from './components/AppInside'

    export default {
        name: 'app',
        data: () => {
            return {

            }
        },
        computed: {},
        components: {
            IntroForm,
            AppInside
        },
        methods: {
            saveUserToDb: (userObject) => {
                console.log(this.$FireBaseDb);
                this.$FireBaseDb.ref('users/' + userObject.uid).set({
                    username: userObject.name,
                    email: userObject.email,
                    pic: userObject.pic
                });
            },
            saveUserDataToDb:(dataSet) => {
                console.log(this.$FireBaseDb);
                this.$FireBaseDb.ref('userdata/' + dataSet.uid).set({
                    folders: dataSet.dataset
                });
            }
        },
        mounted: function(){

        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
