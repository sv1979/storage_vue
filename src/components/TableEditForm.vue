<template>
    <div>
        <form action="" v-bind:class="['tef', show_form?'form_shown':'']">
            <label v-if="show_form">Unit: <input type="text" v-model="this_unit" ref="itemunit"></label>
            <label v-if="show_form">Min Normal: <input type="number" v-model="this_min"></label>
            <label v-if="show_form">Max Normal: <input type="number" v-model="this_max"></label>

            <button type="submit" v-if="show_form" class="tef__button" v-on:click.prevent="saveText">
                <font-awesome-icon :icon="['fal','save']" />
            </button>
            <button class="tef__button form_toggler" v-on:click.prevent="toggleForm()">
                <font-awesome-icon :icon="['fal','sliders-h']" v-if="!show_form" />
                <font-awesome-icon :icon="['fal','undo']" v-else />
            </button>
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
                this_min: null
            }
        },
        props: {
            reference_text:String,
            reference_norm:Object
        },
        components: { FontAwesomeIcon },
        methods: {
            saveText: function(){

            },
            toggleForm: function(){
                this.show_form = !this.show_form;
                if(this.show_form){
                    this.this_unit = this.ref_unit;
                    this.this_max = this.ref_norm.max;
                    this.this_min = this.ref_norm.min;
                }
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
        }
    }
</script>
<style scoped>
    form {
        position: absolute;
        right: 0;
        top: -2rem;
        display: flex;
        justify-content: flex-end;
    }
    .form_shown {
        width: 100%;
    }
    .form_toggler {
        align-self: flex-start;
    }
    textarea {
        flex: 1 1 auto;
        border: none;
        background-color: rgba(200,200,200,.75);
    }
</style>
