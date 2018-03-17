<template>
    <a href="#"
       v-on:click="set_active_tab"
       v-bind:class="{ active: order===active_tab, editmode: show_form===true }">
        <span v-html="navItem.title || navItem.caption" v-if="!show_form"></span>
        <font-awesome-icon :icon="[ 'fal', order===active_tab ? 'angle-double-right' : 'angle-right' ]" v-if="!show_form" />

        <AddPiece button_text="A" v-bind:level="3" @edit_nav_piece = "editNavPiece" @hide_form="hideForm"
                  v-if="show_form" :initial_show="initial_show" v-bind:order="order"
                  :reference_text="navItem.title || navItem.caption"/>

        <button class="styled_button danger_bg remove_item"
                v-if="nav_index === 1 && (1 === edit_nav && all_data.folders.length > 1)"
                v-on:click.stop="removeNavItem">
            <font-awesome-icon :icon="['fal','times']" fixed-width />
        </button>
        <button class="styled_button danger_bg remove_item" v-if="nav_index === 2 && 2 === edit_nav"
                v-on:click.stop="removeNavItem">
            <font-awesome-icon :icon="['fal','times']" fixed-width />
        </button>
        <button class="styled_button edit_item" v-if="nav_index === edit_nav" v-on:click.stop="show_form = !show_form">
            <font-awesome-icon :icon="['fal','pencil']"  fixed-width />
        </button>
    </a>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import AddPiece from './AddPiece'

    export default {
        name: 'NavItem',
        data: () => {
            return {
                show_form: false,
                this_val:  null
            }
        },
        props:{
            navItem:Object,
            all_data:Object,
            active_tab:Number,
            order:Number,
            nav_index:Number,
            edit_nav:Number,
            initial_show: Boolean,
        },
        components: { FontAwesomeIcon, AddPiece },
        methods: {
            removeNavItem: function(){
                this.$emit('removeNavItem',this.order,this.nav_index);
            },
            set_active_tab: function(){
                switch(this.nav_index) {
                    case 1: this.$emit('set_active_tab',this.order); break;
                    case 2: this.$emit('set_active_article',this.order); break;
                }
            },
            editNavPiece: function(val,nav,order){
                this.this_val = val;
                this.show_form = false;
                this.$emit('saveNavItem',val,this.nav_index,order);
            },
            hideForm: function(){
                this.show_form = false;
            },
        },

    }
</script>
<style>
    form {
        flex: 1;
        padding-right: 0;
    }
</style>