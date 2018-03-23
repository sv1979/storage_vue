<template>
    <header class="mv_header" v-bind:class="{ expanded : show_form }">
        <div class="back_link" v-on:click="go_back()" v-if="show_class > 1">
            <font-awesome-icon :icon="['fal','angle-double-left']" />
        </div>
        <div class="search_toggle" v-on:click="change_form_show_status" v-bind:class="['search_toggle', show_form?'form_shown':'']">
            <font-awesome-layers>
                <font-awesome-icon :icon="['fal','circle']" transform="grow-2" />
                <font-awesome-icon :icon="['fal','search']" transform="shrink-8" />
            </font-awesome-layers>
        </div>
        <form v-show="form_shown || ($mq.resize && $mq.above('768px'))">
            <input type="search" placeholder="Search..." v-model="this_search">
            <button type="submit"
                    v-on:click.prevent="makeSearch()"><font-awesome-icon :icon="['fal','search']" /></button>
            <button type="reset" v-show="this_search"
                    v-on:click.prevent="resetSearch()">&times;</button>
            <span class="no_res" v-if="no_results" v-on:click="resetSearch()">No results</span>
        </form>

        <div class="usercorner">
            <div class="username">
                {{ this.$store.getters.get_current_user_name | truncate(($mq.resize && $mq.above('768px')) ? 20 : 8) }}
            </div>
            <div class="userpic" v-bind:style="{ backgroundImage: userpic }">
                <i class="fal fa-user" aria-hidden="true" v-if="userpic == null"></i>
            </div>
            <a href="#" v-on:click="logout()" ><font-awesome-icon :icon="['fal','sign-out']" /></a>
        </div>
    </header>
</template>

<script>
    import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
    import firebase from 'firebase'

    export default {
        name: 'MainHeader',
        beforeCreate () {

        },
        data: () => {
            return {
                this_search: null,
                form_shown: this.show_form
            }
        },
        props: {
            show_class:Number,
            show_form:Boolean,
            search_t: String,
            no_results: Boolean,
            userpic: String
        },
        methods: {
            makeSearch: function(){
                let vm = this,
                    searchterm = vm.this_search ? vm.this_search.toLowerCase() : '';
                vm.$emit('searchData', searchterm);
            },
            resetSearch: function(){
                let vm = this;

                vm.this_search = '';
                vm.$emit('searchData', '');
            },
            go_back: function(){
                this.$emit('navBack');
            },
            change_form_show_status(){
                this.form_shown = !this.form_shown
            },
            logout: function(){
                let vm = this;
                firebase.auth().signOut().then(function() {
                    vm.$store.dispatch('change_interface_action', 'intro_form');
                    vm.$emit('clean_user_data');
                }).catch(function(error) {
                    console.log(error);
                });
            }
        },
        components: {
            FontAwesomeIcon, FontAwesomeLayers
        },
        computed: {

        },
        mounted: function(){
            this.this_search = this.search_t
        },
        filters: {
            truncate: function(text, stop, clamp){
                return text ? text.slice(0, stop) + (stop < text.length ? clamp || '...' : '') : ''
            }
        }
    }
</script>

<style scoped>
    .usercorner a {
        padding-left: 1rem;
    }
</style>
