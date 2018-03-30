<template>
    <div>
        <form action="" v-bind:class="['tef', show_form?'form_shown':'']">
            <label v-if="show_form"> <span>Unit:</span><input type="text" v-model="this_unit" ref="itemunit"></label>
            <label v-if="show_form"> <span>Min:</span> <input type="number" v-model="this_min"></label>
            <label v-if="show_form"> <span>Max:</span> <input type="number" v-model="this_max"></label>

            <div class="buttons">
                <button class="tef__button" v-if="show_form" type="reset" title="Reset form">
                    <font-awesome-icon :icon="['fal','times']" />
                </button>
                <button type="submit" v-if="show_form" class="tef__button" v-on:click.prevent="saveTableSettings">
                    Save <font-awesome-icon :icon="['fal','save']" />
                </button>
                <button class="tef__button form_toggler" v-on:click.prevent="toggleForm()">
                    <font-awesome-icon :icon="['fal','sliders-h']" v-if="!show_form" />
                    <font-awesome-icon :icon="['fal','undo']" v-else />
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
        name: 'TableEditForm',
        data: () => {
            return {
                show_form: false,
                this_unit: null,
                this_max: null,
                this_min: null,
                tab_switched: false
            }
        },
        props: {
            reference_text:String,
            reference_norm:Object
        },
        components: { FontAwesomeIcon },
        methods: {
            saveTableSettings: function(){
                let min_val = this.this_min, max_val=this.this_max;
                if(min_val && max_val && parseFloat(min_val) > parseFloat(max_val)){
                    min_val = this.this_max; max_val=this.this_min
                }
                this.$emit('save_table_settings',{'unit':this.this_unit,'min':min_val,'max':max_val} );
            },
            toggleForm: function(){
                this.show_form = !this.show_form;
                if(this.show_form){
                    this.this_unit = this.ref_unit;
                    this.this_max = this.ref_norm.max;
                    this.this_min = this.ref_norm.min;
                }
            },
            tabSwitch: function(value){
                this.tab_switched = value;
            }
        },
        updated: function(){

        },
        beforeMount: function(){
            this.this_unit = this.ref_unit;
            this.this_max = this.ref_norm.max;
            this.this_min = this.ref_norm.min;
        },
        computed: {
            ref_unit: function(){
                return this.reference_text
            },
            ref_norm: function(){
                return this.reference_norm ? this.reference_norm : { max:'', min:'' }
            }
        },
        watch: {
            tab_switched: function(){
                this.show_form = false;
                this.tab_switched = false;
            }
        }
    }
</script>
<style scoped>
    form {
        position: absolute;
        right: .5rem;
        top: -1.5rem;
        display: flex;
        justify-content: flex-end;
    }
    .form_shown {
        width: 100%;
        position: relative;
        margin-top: 3rem;
    }
    .form_toggler {
        align-self: flex-start;
    }
    textarea {
        flex: 1 1 auto;
        border: none;
        background-color: rgba(200,200,200,.75);
    }
    .buttons {
        display: flex;
    }

    @media screen and (max-width: 991px) {
        .form_shown {
            flex-direction: column;
            padding: 0 .5rem 0;
        }
        label {
            padding: 0;
        }
        .buttons button {
            flex: 1;
        }
    }
</style>
