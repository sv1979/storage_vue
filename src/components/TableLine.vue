<template>
    <tr v-if="!show_form" >
        <td>{{ activeArticleDataItem.date | moment("DD MMM YYYY") }}</td>
        <td>{{ activeArticleDataItem.value }} {{ unit }}</td>
        <td v-if="normal_value != null">
            <span v-if="parseFloat(activeArticleDataItem.value) < parseFloat(normal_value.min)">L</span>
            <span v-if="parseFloat(activeArticleDataItem.value) > parseFloat(normal_value.max)">H</span>
        </td>
        <td v-if="normal_value != null">
            <span>{{ normal_value.min }} <span v-if="normal_value.max && normal_value.min">-</span> {{ normal_value.max }}</span>
            <span v-if="normal_value.text">{{ normal_value.text }}</span>
        </td>
        <td>
            <button class="styled_button form_toggler" v-on:click.prevent="show_form = !show_form">
                <font-awesome-icon :icon="['fal','pencil']" />
            </button>
        </td>
    </tr>
    <tr v-else>
        <td :colspan="normal_value != null ? 5 : 3">
            <AddTableLine :initial_date='activeArticleDataItem.date.toString()' :initial_val='activeArticleDataItem.value' :cell_order='order'
                          :initial_show="true" :show_reorder="true" :lastloop="lastloop"
                          @hide_form="hideForm" @save_line="save_cell" @line_remove="lineRemove"
                          ref="tableLineForm"/>
        </td>
    </tr>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import Datepicker from 'vuejs-datepicker'
    import AddTableLine from './AddTableLine'

    export default {
        name: 'TableLine',
        props: {
            activeArticleDataItem:Object,
            unit:String,
            normal_value:Object,
            order: Number,
            lastloop: Boolean
        },
        data: () => {
            return {
                show_form: false,
                this_date: null,
                this_val:  null,
                date_invalid: false,
                val_invalid: false,
                tab_switched: false
            }
        },
        components: { FontAwesomeIcon, Datepicker, AddTableLine },
        methods: {
            hideForm: function(){
                this.show_form = false;
            },
            save_cell: function(date,value,order){
                this.$emit('save_line',date,value,order);
            },
            lineRemove: function(order){
                this.$emit('line_remove',order);
            },
        },
        watch: {
            tab_switched: function(){
                this.show_form = false;
                if(this.$refs.tableLineForm){
                    // this.$refs.tableLineForm.hideForm();
                    this.$refs.tableLineForm.tabSwitch(true);
                }
                this.tab_switched = false;
            }
        }
    }
</script>
<style scoped>
    td:nth-last-child(2), td:last-child {
        text-align: right;
    }
</style>