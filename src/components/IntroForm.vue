<template>
    <div class="for_form" id="intro_form" v-show="this.$store.getters.get_interface === 'intro_form'" v-cloak>
        <canvas id="rainfield"></canvas>

        <div class="form_nav">
            <a href="#" v-bind:class="{ active: show_login }" v-on:click.prevent="show_login = !show_login">Login</a>
            <a href="#" v-bind:class="{ active: !show_login }"
               v-on:click.prevent="show_login = !show_login">Register</a>
        </div>

        <form action="#" class="login_form" v-if="show_login">
            <input type="text" name="username" placeholder="Email"
                   v-model.trim="username">
            <input type="password" name="password" placeholder="Password" v-model.trim="password">

            <div class="errors" v-show=" error_message !== '' ">{{ error_message }}</div>

            <input type="submit" value="Login" v-on:click.prevent="login_submit">

        </form>
        <form action="#" class="login_form" v-else>
            <input type="text" name="username" placeholder="Email" v-model.trim="username">
            <input type="password" name="password" placeholder="Password" v-model.trim="password">
            <input type="password" name="r_password" placeholder="Repeat Password" v-model.trim="r_password">

            <div class="errors" v-show=" error_message !== '' ">{{ error_message }}</div>

            <input type="submit" value="Register" v-on:click.prevent="register_submit">
        </form>
    </div>
</template>

<script>

    const axios = require('axios');

    export default {
        beforeCreate () {
            // console.log('==='+this.$store.getters.get_interface);
        },
        name: 'IntroForm',
        data: () => {
            return {
                show_login: true,
                username: '',
                password: '',
                r_password: '',
                error_message: ''
            }
        },
        props: {
        },
        methods: {
            login_submit: function () {

                let vm = this, logged_in = this.username.length > 0 && this.password.length > 0;

                if (logged_in) {

                    this.$FireAuth.signInWithEmailAndPassword(this.username,this.password)
                        .then(
                            (user)=>{

                                let $user = {
                                    'name':user.displayName?user.displayName:user.email.slice(0,user.email.indexOf("@")),
                                    'pic':user.photoURL,
                                    'uid':user.uid,
                                    'dataset':{}
                                };

                                this.$FireBaseDb.ref('userdata/' + user.uid).once('value').then( function(snapshot){
                                    $user.dataset = snapshot.val();

                                    vm.$store.dispatch('set_current_user_action', $user);
                                    vm.$store.dispatch('change_interface_action', 'main_view');
                                });

                                this.username = '';
                                this.password = '';
                                this.r_password = '';
                            },
                            (error)=>{
                                console.log("Error: ", error);
                                this.error_message = error.message;
                            }
                        );
                } else {
                    this.error_message = 'Please fill all fields'
                }

                return logged_in;
            },

            register_submit: function () {
                let logged_in = this.username.length > 0 && this.password.length > 0 && this.password === this.r_password;

                if (this.username.length === 0 || this.password.length === 0) {
                    this.error_message = 'Please fill all fields'
                }

                if (this.password !== this.r_password) {
                    this.error_message = 'Passwords should match'
                }
                if(logged_in) {
                    this.$FireAuth.createUserWithEmailAndPassword(this.username, this.password)
                        .then(
                            (user)=>{

                                let $user = {
                                    'name':this.username.slice(0,this.username.indexOf("@")),
                                    'pic':'',
                                    'uid':user.uid
                                };
                                axios.get('https://randomuser.me/api/', {
                                    params: { dataType: 'json' }
                                })
                                    .then((response) => {
                                        $user.pic = response.data.results[0].picture['medium'];

                                        user.updateProfile({
                                            displayName: this.username.slice(0,this.username.indexOf("@")),
                                            photoURL: $user.pic
                                        });

                                        this.$store.dispatch('change_interface_action', 'main_view');
                                        this.$store.dispatch('set_current_user_action', $user);

                                        this.$emit('save_user_to_db',
                                            {
                                                'uid':user.uid,
                                                'name':this.username.slice(0,this.username.indexOf("@")),
                                                'email':this.username,
                                                'pic': $user.pic
                                            });

                                        this.username = '';
                                        this.password = '';
                                        this.r_password = '';

                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })

                                user.sendEmailVerification().then(function() {
                                    console.log('Verification email sent');
                                }).catch(function(error) {
                                    console.log('Verification email error: ', error);
                                });
                            },
                            (error)=>{
                                console.log("Error: ", error);
                                this.error_message = error.message;
                            }

                        );
                }

            },
        },
        computed: {},
    }
</script>


<style scoped>
    canvas {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 100vh;
    }
    form {
        flex: 0 0 auto;
    }
</style>
