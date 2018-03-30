<template>
    <div>
        <form action="" v-bind:class="['atl', show_form?'form_shown':'']" v-on:submit="saveLine" >
            <button class="atl__button form_toggler"
                    v-on:click.prevent='switchFormState'>
                <span v-if="!show_form">Add data</span><font-awesome-icon :icon="['fal','pencil']" v-if="!show_form" />
                <font-awesome-icon :icon="['fal','undo']" v-else />
            </button>

            <div class="atl__form_here" v-if="show_form">
                <datepicker v-model="this_date" ref="itemdate" v-bind:class="['styled_input', date_invalid?'form_shown':'']"
                            placeholder="Select Date" :monday-first="true" calendar-class="atl__datepicker" format="dd MMM yyyy"
                            :disabled="this.disabled_future" :value="initial_date"/>
                <input type="text" v-model="this_val" ref="itemval" class="styled_input" required v-on:keypress.enter="saveLine"/>

                <div class="buttons">
                    <button class="atl__button" type="reset" title="Reset form">
                        <font-awesome-icon :icon="['fal','times']" />
                    </button>
                    <button class="atl__button" type="submit" v-on:click.prevent="saveLine">Save
                        <font-awesome-icon :icon="['fal','save']" />
                    </button>
                    <button class="atl__button danger_bg" v-if="show_reorder" v-on:click.prevent="lineRemove" title="Remove">
                        <font-awesome-icon :icon="['fal','trash-alt']" />
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import Datepicker from 'vuejs-datepicker'
    import moment from 'moment'

    export default {
        name: 'AddTableLine',
        props: {
            initial_date: String,
            initial_val: String,
            initial_show: Boolean,
            cell_order: Number,
            show_reorder:Boolean,
            lastloop:Boolean
        },
        data: () => {
            return {
                show_form: false,
                this_date: null,
                this_val:  null,
                date_invalid: false,
                val_invalid: false,
                cellorder: null,
                tab_switched: false
            }
        },
        components: { FontAwesomeIcon, Datepicker },
        updated: function(){

        },
        methods: {
            saveLine: function(){
                if(this.this_date === null){
                    this.date_invalid = true
                }
                else if(this.this_val === null){
                    this.val_invalid = true
                }
                else {
                    let date_string = (typeof this.this_date === 'object') ?
                        moment(this.this_date).format('YYYY-MM-DD'):
                        this.this_date;

                    this.$emit('save_line', date_string, this.this_val, this.cellorder);
                    this.show_form = false;
                    this.date_invalid = false;
                    this.val_invalid = false;
                    this.this_date = null;
                    this.this_val = null;
                    this.$emit('hide_form');
                }
            },
            switchFormState:function(){
                if (this.initial_show){
                    this.$emit('hide_form');
                } else {
                    this.show_form = !this.show_form
                }
            },
            hideForm: function(){
                this.$emit('hide_form');
            },
            lineRemove: function(){
                this.$emit('line_remove', this.cellorder);
                this.$emit('hide_form');
            },
            tabSwitch: function(value){
                this.tab_switched = value;
            }
        },
        watch: {
            tab_switched: function(){
                this.show_form = false;
                this.tab_switched = false;
            }
        },
        computed: {
            disabled_future:()=>{
                return { from: new Date() }
            }
        },
        mounted: function(){
            this.this_date = this.initial_date ? this.initial_date.toString() : null;
            this.this_val = this.initial_val !== null ? this.initial_val : null;
            this.show_form = this.initial_show !== null ? this.initial_show : false;
            this.cellorder = this.cell_order>-1 ? this.cell_order : null;
        },
    }
</script>
<style scoped>

</style>