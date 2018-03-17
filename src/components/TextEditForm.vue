<template>
    <div>
        <form action="" v-bind:class="['tef', show_form?'form_shown':'', element===1?'in_header':'in_footer']">
            <textarea name="item_text" placeholder="Item text" rows="1" ref="itemtext" class="styled"
                      v-model="this_piece" v-if="show_form" v-on:submit="saveText" v-on:keyup.enter.stop="saveText"></textarea>
            <button type="submit" v-if="show_form" class="tef__button" v-on:click.prevent="saveText">
                <font-awesome-icon :icon="['fal','save']" />
            </button>
            <button class="tef__button form_toggler" v-on:click.prevent="toggleForm()">
                <font-awesome-icon :icon="['fal','pencil']" v-if="!show_form" />
                <font-awesome-icon :icon="['fal','undo']" v-else />
            </button>
        </form>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
        name: 'TextEditForm',
        data: () => {
            return {
                show_form: false,
                this_piece: null,
                tab_switched: false
            }
        },
        props: {
            element:Number,
            reference_text:String
        },
        components: { FontAwesomeIcon },
        methods: {
            saveText: function(){
                this.$emit('save_element',this.this_piece,this.element);
                this.show_form = false;
            },
            toggleForm: function(){
                this.show_form = !this.show_form;
                if(this.show_form){
                    this.this_piece = this.ref_text;
                }
            },
            tabSwitch: function(value){
                this.tab_switched = value;
            }
        },
        updated: function(){
            if (this.show_form) {
                this.$refs.itemtext.focus();
            }
        },
        beforeMount: function(){
            this.this_piece = this.ref_text;
        },
        computed: {
            ref_text: function(){
                return this.reference_text
            }
        },
        watch: {
            tab_switched: function(){
                this.show_form = false;
                this.tab_switched = false;
            }
        },
    }
</script>
<style scoped>
    form {
        position: absolute;
        right: 0;
        padding: 1rem 0;
        display: flex;
        justify-content: flex-end;
        min-height: 68px;
    }
    .in_header{
        top: 0;
        align-items: flex-start;
    }
    .in_footer {
        bottom: 0;
        align-items: flex-end;
    }
    .form_shown {
        width: 100%;
    }
    textarea {
        flex: 1 1 auto;
        border: none;
        background-color: rgba(200,200,200,.75);
    }
    .in_header textarea {
        text-align: center;
        min-height: 100px;
    }
    .in_footer textarea {
        min-height: 100px;
    }
</style>
