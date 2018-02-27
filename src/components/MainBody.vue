<template>
    <div v-bind:class="[ 'mv', 'show_class_'+ show_class ]">
        <aside class="mv_aside">
            <a href="#"
               v-for="(item,index) in filtered_data.folders"
               v-on:click="set_active_tab(index)" v-bind:key=index
               v-bind:class="{ active: index===active_tab }"><span v-html="highlightText(item.title)"></span>
                <font-awesome-icon :icon="[ 'fal', index===active_tab ? 'angle-double-right' : 'angle-right' ]" />
            </a>

            <AddPiece button_text="Add item" v-bind:level="1" @save_piece = "saveItem" />
        </aside>

        <aside class="mv_subnav">
            <a href="#"
               v-for="(item,index) in filtered_data.folders[active_tab].items"
               v-on:click="set_active_article(index)" v-bind:key=index
               v-bind:class="{ active: index===active_article }"><span v-html="highlightText(item.caption)"></span>
                <font-awesome-icon :icon="[ 'fal', index===active_article ? 'angle-double-right' : 'angle-right' ]" />
            </a>

            <AddPiece button_text="Add item" v-bind:level="2" @save_piece = "saveItem" />
        </aside>

        <main class="mv_main">
            <article class="mv_article" v-if="active_article_data == null">
                <header>No data</header>
            </article>
            <article class="mv_article" v-else>
                <header v-html="highlightText(active_article_data.caption)"></header>

                <div class="table_data">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value</th>
                            <th v-if="active_article_data.normal_value != null"></th>
                            <th v-if="active_article_data.normal_value != null">Normal value</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(item,index) in active_article_data.data"  v-bind:key="index">
                            <td>{{ item.date }}</td>
                            <td>{{ item.value }} {{ active_article_data.unit }}</td>
                            <td v-if="active_article_data.normal_value != null">
                                <!--{{ show_change(active_article_data.data, index) }}-->
                                <span v-if="item.value < active_article_data.normal_value.min">L</span>
                                <span v-if="item.value > active_article_data.normal_value.max">H</span>
                            </td>
                            <td v-if="active_article_data.normal_value != null">
                                <span v-if="active_article_data.normal_value.text">{{ active_article_data.normal_value.text }}</span>
                                <span v-else>{{ active_article_data.normal_value.min }} - {{ active_article_data.normal_value.max }}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <footer v-html="highlightText(active_article_data.description)"></footer>
            </article>
        </main>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import AddPiece from './AddPiece'

    export default {
        name: 'MainBody',
        beforeCreate () {

        },
        data: () => {
            return {
                this_search: null
            }
        },
        props: {
            show_class:Number,
            active_tab:Number,
            active_article:Number,
            filtered_data: Object,
            active_article_data: Object
        },
        methods: {
            set_active_tab(index){
                this.$emit('setTab',index)
            },
            set_active_article(index){
                this.$emit('setArticle',index)
            },
            highlightText(text){
                return this.$parent.highlight(text)
            },
            saveItem(text,level){
                this.$emit('save_item', text,level);
            }
        },
        components: {
            FontAwesomeIcon,
            AddPiece
        },
        computed: {

        },
        mounted: function(){

        },
    }
</script>

<style scoped>
    table {
        margin-bottom: 1rem;
    }
    td:first-child, th:first-child {
        padding-left: 0;
    }
    td:last-child, th:last-child {
        text-align: right;
    }
</style>
