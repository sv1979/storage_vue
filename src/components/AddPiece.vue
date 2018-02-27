<template>
    <form class="ap_cell" action="#">
        <input type="text" name="item_name" placeholder="Item name"  ref="itemname"
               v-model="this_piece" v-if="show_form" v-on:submit="savePiece">
        <button type="submit" v-if="show_form" class="contrast_button" v-on:click.prevent="savePiece">
            <font-awesome-icon :icon="['fal','save']" />
        </button>
        <button class="form_toggler" v-on:click.prevent="show_form = !show_form">
            <span v-if="!show_form">{{ button_text }}</span>
            <font-awesome-icon :icon="['fal','plus']" v-if="!show_form" />
            <font-awesome-icon :icon="['fal','undo']" v-else />
        </button>
    </form>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
        name: 'AddPiece',
        data: () => {
            return {
                show_form: false,
                this_piece: null
            }
        },
        props: {
            button_text:String,
            level:Number
        },
        components: { FontAwesomeIcon },
        methods: {
            savePiece: function(){
                this.$emit('save_piece',this.this_piece,this.level);
                this.this_piece = null;
                this.show_form = false;
            }
        },
        updated: function(){
            if (this.show_form) {
                this.$refs.itemname.focus();
            }
        }
    }
</script>
<style scoped>
    input {
        flex: 1 1 auto;
        width: 50px;
    }
    button + button {
        margin-left: 1rem;
    }
</style>