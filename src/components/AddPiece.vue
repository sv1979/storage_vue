<template>
    <form class="ap_cell" action="#">
        <input type="text" name="item_name" placeholder="Item name"  ref="itemname"
               v-model="this_piece" v-if="show_form" v-on:submit="savePiece">
        <button type="submit" v-if="show_form" class="contrast_button" v-on:click.prevent="savePiece">
            <font-awesome-icon :icon="['fal','save']" />
        </button>
        <button class="form_toggler" v-if="level < 3" v-on:click.prevent="switchFormState">
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
            level:Number,
            initial_show: Boolean,
            order: Number,
            reference_text: String
        },
        components: { FontAwesomeIcon },
        methods: {
            savePiece: function(){
                switch(this.level){
                    case 1: case 2:
                        this.$emit('save_piece',this.this_piece,this.level);
                        break;
                    case 3:
                        this.$emit('edit_nav_piece',this.this_piece, this.level, this.order);
                        break;
                }

                this.this_piece = null;
                this.show_form = false;
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
            }
        },
        updated: function(){
            if (this.show_form) {
                this.$refs.itemname.focus();
            }
        },
        mounted: function(){
            this.show_form = this.initial_show !== null ? this.initial_show : false;
            if (this.initial_show!==null && this.reference_text !== null) {
                this.this_piece = this.reference_text;
            }
        },
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