<template>
    <div>
        <form action="" v-bind:class="['atl', show_form?'form_shown':'']" v-on:submit="saveLine">
            <button class="atl__button form_toggler" v-on:click.prevent="show_form = !show_form">
                <span v-if="!show_form">Add data</span><font-awesome-icon :icon="['fal','pencil']" v-if="!show_form" />
                <font-awesome-icon :icon="['fal','undo']" v-else />
            </button>

            <div class="atl__form_here" v-if="show_form">
                <input type="text" v-model="this_date" ref="itemdate" class="styled_input" required>
                <input type="text" v-model="this_val" ref="itemval" class="styled_input" required>
                <button class="atl__button" type="submit">Save</button>
            </div>
        </form>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
        name: 'AddTableLine',
        props: {

        },
        data: () => {
            return {
                show_form: false,
                this_date: '',
                this_val:  ''
            }
        },
        components: { FontAwesomeIcon },
        updated: function(){

        },
        methods: {
            saveLine: function(){
                this.$emit('save_line',this.this_date,this.this_val);
                this.show_form = false;
            }
        }
    }
</script>
<style scoped>

</style>