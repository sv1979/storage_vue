<template>
    <tr v-if="!show_form" >
        <td>{{ activeArticleDataItem.date | moment("DD MMM YYYY") }}</td>
        <td>{{ activeArticleDataItem.value }} {{ unit }}</td>
        <td v-if="normal_value != null">
            <span v-if="activeArticleDataItem.value < normal_value.min">L</span>
            <span v-if="activeArticleDataItem.value > normal_value.max">H</span>
        </td>
        <td v-if="normal_value != null">
            <span v-if="normal_value.text">{{ normal_value.text }}</span>
            <span v-else>{{ normal_value.min }} - {{ normal_value.max }}</span>
        </td>
        <td>
            <button class="styled_button form_toggler" v-on:click.prevent="show_form = !show_form">
                <font-awesome-icon :icon="['fal','pencil']" />
            </button>
        </td>
    </tr>
    <tr v-else>
        <td :colspan="normal_value != null ? 5 : 3">
            <AddTableLine :initial_date='activeArticleDataItem.date' :initial_val='activeArticleDataItem.value' :cell_order='order'
                          :initial_show="true" @hide_form="hideForm" @save_line="save_cell"/>
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
            order: Number
        },
        data: () => {
            return {
                show_form: false,
                this_date: null,
                this_val:  null,
                date_invalid: false,
                val_invalid: false
            }
        },
        components: { FontAwesomeIcon, Datepicker, AddTableLine },
        methods: {
            hideForm: function(){
                this.show_form = false;
            },
            save_cell: function(date,value,order){
                this.$emit('save_line',date,value,order);
            }
        }
    }
</script>
<style scoped>
    td:nth-last-child(2), td:last-child {
        text-align: right;
    }
</style>