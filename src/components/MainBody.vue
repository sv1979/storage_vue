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
                <header class="with_edit_button">
                    <span v-html="highlightText(active_article_data.caption)"></span>
                    <TextEditForm v-bind:element="1" v-bind:reference_text=active_article_data.caption @save_element = "saveElement" />
                </header>

                <div class="table_data" v-if="active_article_data.data.length > 0">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value</th>
                            <th v-if="active_article_data.normal_value != null"></th>
                            <th v-if="active_article_data.normal_value != null">Normal value</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                            <TableLine v-for="(item,index) in active_article_data.data"
                                   v-bind:key="index" v-bind:activeArticleDataItem="item" v-bind:unit="active_article_data.unit"
                                   v-bind:normal_value="active_article_data.normal_value" v-bind:order="index" @save_line="saveLine"/>
                        </tbody>
                    </table>

                    <AddTableLine @save_line="saveLine"/>
                </div>

                <footer class="with_edit_button">
                    <span v-html="highlightText(active_article_data.description)"></span>
                    <TextEditForm v-bind:element="2" v-bind:reference_text=active_article_data.description @save_element = "saveElement" />
                </footer>
            </article>
        </main>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import AddPiece from './AddPiece'
    import TextEditForm from './TextEditForm'
    import TableLine from './TableLine'
    import AddTableLine from './AddTableLine'

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
            },
            saveElement(text,element){
                this.$emit('save_element', text,element);
            },
            saveLine(date,value,order){
                this.$emit('save_line', date,value,order);
            }
        },
        components: {
            FontAwesomeIcon,
            AddPiece,
            TextEditForm,
            TableLine,
            AddTableLine
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
    th:last-child {
        width: 3rem;
    }
    td:first-child, th:first-child {
        padding-left: 0;
    }
    td:nth-last-child(2), th:nth-last-child(2), td:last-child, th:last-child {
        text-align: right;
    }
</style>
